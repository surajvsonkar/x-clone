'use client';

import { useUser } from '@clerk/nextjs';
import Image from './Image';
import Post from './Post';
import { Post as PostType } from '@prisma/client';
import { useActionState, useEffect } from 'react';
import { addComment } from '@/action';
import { socket } from '@/socket';

type commentWithDetails = PostType & {
	user: { displayName: string | null; username: string; img: string | null };
	_count: { likes: number; rePosts: number; comments: number };
	likes: { id: number }[];
	rePosts: { id: number }[];
	saves: { id: number }[];
};

const Comments = ({
	comments,
	postId,
	username,
}: {
	comments: commentWithDetails[];
	postId: number;
	username: string;
}) => {
	const { isLoaded, isSignedIn, user } = useUser();

	const [state, formAction, isPending] = useActionState(addComment, {
		success: false,
		error: false,
	});

	// if (!user) return;
	useEffect(() => {
		if (state.success) {
			socket.emit('sendNotification', {
				receiverUsername: username,
				data: {
					senderUsername: user?.username,
					type: 'comment',
					link: `/${username}/status/${postId}`,
				},
			});
		}
	}, [state.success, username, user?.username, postId]);
	return (
		<div>
			{user && (
				<form
					action={formAction}
					className="flex items-center justify-between gap-4 p-4"
				>
					<div className="flex justify-center items-center gap-4">
						<div className="-z-10 relative w-10 h-10 rounded-full overflow-hidden">
							<Image
								src={user?.imageUrl}
								alt="suraj sonkar"
								width={100}
								height={100}
								tr={true}
							/>
						</div>
						<input name="postId" type="number" hidden readOnly value={postId} />
						<input
							name="username"
							type="text"
							hidden
							readOnly
							value={username}
						/>
						<input
							name="desc"
							type="text"
							className="bg-transparent  outline-none p-2 text-xl"
							placeholder="Post your reply!"
						/>
					</div>
					<button
						disabled={isPending}
						className="py-2 px-4 font-bold bg-white text-black rounded-full disabled:cursor-not-allowed disabled:bg-slate-200"
					>
						{isPending ? 'Replying' : 'Reply'}
					</button>
				</form>
			)}

			{state.error && (
				<span className="text-red-300 p-4">Something went wrong!</span>
			)}

			{comments.map((comment) => (
				<div key={comment.id}>
					<Post post={comment} type="comment" />
				</div>
			))}
		</div>
	);
};

export default Comments;
