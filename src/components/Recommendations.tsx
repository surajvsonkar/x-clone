import { prisma } from '@/prisma';
import Image from './Image';
import { auth } from '@clerk/nextjs/server';

const Recommendations = async () => {
	const { userId } = await auth();

	if (!userId) return;

	const followingIds = await prisma.follow.findMany({
		where: {
			followerId: userId,
		},
		select: {
			followingId: true,
		},
	});

	const followedUserIds = followingIds.map((f) => f.followingId);
	// console.log(followedUserIds);
	const friendRecommendations = await prisma.user.findMany({
		where: {
			id: { not: userId, notIn: followedUserIds },
			following: { some: { followerId: { in: followedUserIds } } },
		},
		take: 3,
		select: { id: true, img: true, displayName: true, username: true },
	});
	return (
		<div className="p-4 rounded-2xl border-[1px] border-borderGray flex flex-col gap-4">
			{friendRecommendations.map((person) => (
				<div className="flex justify-between items-center" key={person.id}>
					<div className="flex gap-2 items-center">
						<div className="relative rounded-full overflow-hidden w-10 h-10">
							<Image
								path={person.img || "general/noAvatar.png"}
								alt=""
								width={100}
								height={100}
								tr={true}
							/>
						</div>
						<div>
							<h1 className="text-md font-bold">{person.displayName}</h1>
							<span className="text-textGray text-sm">@{person.username}</span>
						</div>
					</div>
					<button className="py-1 px-4 bg-white text-black font-semibold rounded-full">
						Follow
					</button>
				</div>
			))}
		</div>
	);
};

export default Recommendations;
