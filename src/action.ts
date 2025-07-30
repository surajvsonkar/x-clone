'use server';

import { auth } from '@clerk/nextjs/server';
import { prisma } from './prisma';
import { success, z } from 'zod';
import { revalidatePath } from 'next/cache';
import { imageKit } from './utils';
import { buffer } from 'stream/consumers';
import { resolve } from 'path';
import { UploadResponse } from 'imagekit/dist/libs/interfaces';

export const LikePost = async (postId: number) => {
	const { userId } = await auth();
	console.log(userId);

	if (!userId) return;

	const existingLike = await prisma.like.findFirst({
		where: {
			userId: userId,
			postId: postId,
		},
	});

	if (existingLike) {
		await prisma.like.delete({
			where: { id: existingLike.id },
		});
	} else {
		await prisma.like.create({
			data: {
				userId,
				postId,
			},
		});
	}
};

export const followUser = async (targetUserId: string) => {
	const { userId } = await auth();

	if (!userId) return;

	const existingFollow = await prisma.follow.findFirst({
		where: {
			followerId: userId,
			followingId: targetUserId,
		},
	});

	if (existingFollow) {
		await prisma.follow.delete({
			where: { id: existingFollow.id },
		});
	} else {
		await prisma.follow.create({
			data: {
				followerId: userId,
				followingId: targetUserId,
			},
		});
	}
};

export const rePost = async (postId: number) => {
	const { userId } = await auth();

	if (!userId) return;

	const existingRePost = await prisma.post.findFirst({
		where: {
			userId: userId,
			rePostId: postId,
		},
	});

	if (existingRePost) {
		await prisma.post.delete({
			where: { id: existingRePost.id },
		});
	} else {
		await prisma.post.create({
			data: {
				userId,
				rePostId: postId,
			},
		});
	}
};

export const savePost = async (postId: number) => {
	const { userId } = await auth();

	if (!userId) return;

	const existingSavePost = await prisma.savedPosts.findFirst({
		where: {
			userId: userId,
			postId: postId,
		},
	});

	if (existingSavePost) {
		await prisma.savedPosts.delete({
			where: { id: existingSavePost.id },
		});
	} else {
		await prisma.savedPosts.create({
			data: {
				userId,
				postId,
			},
		});
	}
};

export const addComment = async (
	prevState: { success: boolean; error: boolean },
	formData: FormData
) => {
	const { userId } = await auth();

	if (!userId) return { success: false, error: true };
	const username = formData.get('username');
	const postId = Number(formData.get('postId'));
	const desc = formData.get('desc');
	console.log(postId);

	const Comment = z.object({
		parentPostId: z.number(),
		desc: z.string().max(140),
	});

	const validatedFields = Comment.safeParse({
		parentPostId: postId,
		desc,
	});

	if (!validatedFields.success) {
		// console.log(validatedFields.error.flatten().fieldErrors)
		return { success: false, error: true };
	}

	try {
		await prisma.post.create({
			data: {
				description: String(desc),
				parentPostId: postId,
				userId,
			},
		});
		revalidatePath(`/${username}/status/${postId}`);
		return {
			success: true,
			error: false,
		};
	} catch (error) {
		console.log(error);
		return { success: false, error: true };
	}
};

export const addPost = async (
	prevState: { success: boolean; error: boolean },
	formData: FormData
) => {
	const { userId } = await auth();

	if (!userId) return { success: false, error: true };

	const description = formData.get('desc');
	const file = formData.get('file') as File;
	const isSensitive = formData.get('isSensitive') as string;
	const imgType = formData.get('imgType');

	const uploadFile = async (file: File):Promise<UploadResponse> => {
		const bytes = await file.arrayBuffer();
		const buffer = Buffer.from(bytes);

		const transformation = `w-600, ${
			imgType === 'square'
				? 'ar-1-1'
				: imgType === 'wide'
				? 'ar-16-9'
				: ''
		}`;
		return new Promise((resolve, reject) => {
			imageKit.upload(
				{
					file: buffer,
					fileName: file.name,
					folder: '/posts',
					...(file.type.includes('image') && {
						transformation: {
							pre: transformation,
						},
					}),
				},
				function (err, result) {
					if (err) reject(err);
					else resolve(result as UploadResponse);
				}
			);
		});
	};

	const Post = z.object({
		description: z.string().max(140),
		isSensitive: z.boolean().optional()
	});

	const validatedFields = Post.safeParse({
		description,
		isSensitive: JSON.parse(isSensitive)
	});

	if (!validatedFields.success) {
		// console.log(validatedFields.error.flatten().fieldErrors)
		return { success: false, error: true };
	}

	let img = ""
	let video = ""

	if(file.size) {
		const result:UploadResponse = await uploadFile(file)

		if(result.fileType === "image") {
			img = result.filePath
		} else {
			video = result.filePath
		}
	}

	try {
		await prisma.post.create({
			data: {
				...validatedFields.data,
				img,
				userId,
				video,
			},
		});
		revalidatePath(`/`);
		return {
			success: true,
			error: false,
		};
	} catch (error) {
		console.log(error);
		return { success: false, error: true };
	}
};
