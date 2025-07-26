'use client';

const FollowButton = ({
	userId,
	isFollowed,
}: {
	userId: string;
	isFollowed: boolean;
}) => {
    console.log(isFollowed)
	return (
		<button className={`${isFollowed ? "py-2 px-4 bg-transparent text-white border border-textGray font-bold rounded-full": "py-2 px-4 bg-white text-black font-bold rounded-full"}`}>
			{isFollowed ? "following" : "follow"}
		</button>
	);
};

export default FollowButton;
