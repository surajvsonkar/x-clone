import Link from 'next/link';
import Image from './Image';

const menuList = [
	{
		id: 1,
		name: 'Homepage',
		link: '/',
		icon: 'home.svg',
	},
	{
		id: 2,
		name: 'Explore',
		link: '/',
		icon: 'explore.svg',
	},
	{
		id: 3,
		name: 'Notification',
		link: '/',
		icon: 'notification.svg',
	},
	{
		id: 4,
		name: 'Messages',
		link: '/',
		icon: 'message.svg',
	},
	{
		id: 5,
		name: 'Bookmarks',
		link: '/',
		icon: 'bookmark.svg',
	},
	{
		id: 6,
		name: 'jobs',
		link: '/',
		icon: 'job.svg',
	},
	{
		id: 7,
		name: 'communities',
		link: '/',
		icon: 'community.svg',
	},
	{
		id: 8,
		name: 'Premium',
		link: '/',
		icon: 'logo.svg',
	},
	{
		id: 9,
		name: 'Profile',
		link: '/',
		icon: 'profile.svg',
	},
	{
		id: 10,
		name: 'More',
		link: '/',
		icon: 'more.svg',
	},
];

const LeftBar = () => {
	return (
		<div className="top-0 h-screen sticky flex flex-col justify-between pt-2 pb-8">
			<div className="flex flex-col gap-4 text-lg items-center xxl:items-start">
				<Link href="/" className="p-2 rounded-full hover:bg-[#181818]">
					<Image path={'icons/logo.svg'} alt="logo" width={24} height={24} />
				</Link>
				<div className="flex flex-col gap-4">
					{menuList.map((item) => (
						<Link
							className="rounded-full hover:bg-[#181818] flex p-2 items-center gap-4"
							href={item.link}
							key={item.id}
						>
							<Image
								path={`icons/${item.icon}`}
								alt={item.name}
								width={24}
								height={24}
							/>
							<span className="hidden xxl:inline">{item.name}</span>
						</Link>
					))}
				</div>
				<Link
					href={'/'}
					className="bg-white text-black rounded-full w-12 h-12 items-center flex justify-center xxl:hidden"
				>
					<Image path="icons/post.svg" alt="new post" width={24} height={24} />
				</Link>
				<Link
					href={'/'}
					className="hidden xxl:block bg-white text-black rounded-full font-bold py-2 px-20"
				>
					POST
				</Link>
			</div>
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<div className="w-10 h-10 relative rounded-full overflow-hidden">
						<Image path="/general/avatar.png" alt="surajvsonkar" width={100} tr={true} />
					</div>
					<div className="hidden xxl:flex flex-col">
						<span className="font-bold ">surajvsonkar</span>
						<span className="text-sm text-gray-100">@surajvsonkar</span>
					</div>
				</div>
				<div className="hidden xxl:block cursor-pointer font-bold">...</div>
			</div>
		</div>
	);
};

export default LeftBar;
