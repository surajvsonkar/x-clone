import Image from './Image';
import Post from './Post';
import { Post as PostType } from '@prisma/client';

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
	return (
		<div>
			<form className="flex items-center justify-between gap-4 p-4">
				<div className="flex justify-center items-center gap-4">
					<div className="relative w-10 h-10 rounded-full overflow-hidden">
						<Image
							path="general/avatar.png"
							alt="suraj sonkar"
							width={100}
							height={100}
							tr={true}
						/>
					</div>
					<input
						type="text"
						className="bg-transparent  outline-none p-2 text-xl"
						placeholder="Post your reply!"
					/>
				</div>
				<button className="py-2 px-4 font-bold bg-white text-black rounded-full">
					Reply
				</button>
			</form>
			{comments.map((comment) => (
				<div key={comment.id}>
					<Post post={comment} type='comment' />
				</div>
			))}
		</div>
	);
};

export default Comments;
