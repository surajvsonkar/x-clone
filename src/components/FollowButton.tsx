'use client';

import { followUser } from '@/action';
import { useOptimistic, useState } from 'react';

const FollowButton = ({
	userId,
	isFollowed,
}: {
	userId: string;
	isFollowed: boolean;
}) => {
	const [state, setState] = useState(isFollowed);

	const followAction = async () => {
		switchOptimisticFollow('');
		await followUser(userId);
		setState((prev) => !prev);
	};

	const [optimisticFollow, switchOptimisticFollow] = useOptimistic(
		state,
		(prev) => !prev
	);

	return (
		<form action={followAction}>
			<button
				className={`${
					isFollowed
						? 'py-2 px-4 bg-transparent text-white border border-textGray font-bold rounded-full'
						: 'py-2 px-4 bg-white text-black font-bold rounded-full'
				}`}
			>
				{optimisticFollow ? 'following' : 'follow'}
			</button>
		</form>
	);
};

export default FollowButton;
