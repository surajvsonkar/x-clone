import { prisma } from '@/prisma';
import Post from './Post';
import { auth } from '@clerk/nextjs/server';
import { InfiniteFeed } from './InfiniteFeed';

const Feed = async ({ userProfileId }: { userProfileId?: string }) => {
	const { userId } = await auth();
	if (!userId) return;

	const whereCondition = userProfileId
		? {parentPostId: null, userId: userProfileId }
		: {
			parentPostId: null,
				userId: {
					in: [
						userId,
						...(
							await prisma.follow.findMany({
								where: { followerId: userId },
								select: { followingId: true },
							})
						).map((follow)=> follow.followingId),
					],
				},
		};

		const posts = await prisma.post.findMany({
			where: whereCondition,
			take: 3,
			skip: 0,
			orderBy: {createdAt: "desc"}
		});

		console.log(posts)
	return (
		<div className="">
			{posts.map((post) => {
				return (
					<div key={post.id}>
						<Post post={post} />
					</div>
				);
			})}
			<InfiniteFeed/>
		</div>
	);
};

export default Feed;
