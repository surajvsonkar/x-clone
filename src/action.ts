'use server';

import { auth } from '@clerk/nextjs/server';
import { prisma } from './prisma';
import {success, z} from 'zod'
import { revalidatePath } from 'next/cache';

export const LikePost = async (postId: number) => {
	const { userId } = await auth();
    console.log(userId)

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
    const username = formData.get("username")
    const postId = Number(formData.get("postId"))
    const desc = formData.get("desc")
    console.log(postId)


    const Comment = z.object({
        parentPostId: z.number(),
        desc: z.string().max(140)
    })

    const validatedFields = Comment.safeParse({
        parentPostId: postId,
        desc
    })

    if(!validatedFields.success) {
        // console.log(validatedFields.error.flatten().fieldErrors)
        return {success:false, error:true}
    }

    try {
        await prisma.post.create({
            data: {
                description:String(desc),
                parentPostId: postId,
                userId
            }
        })
        revalidatePath(`/${username}/status/${postId}`)
        return {
            success: true,
            error:false
        }

    } catch (error) {
        console.log(error)
        return {success:false,error:true}
    }
};
