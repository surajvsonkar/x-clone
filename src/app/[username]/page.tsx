import Feed from '@/components/Feed';
import Image from '@/components/Image';
import Link from 'next/link';

const UserPage = () => {
	return (
		<div>
			<div className="flex items-center gap-8 sticky top-0 backdrop:blur-md p-4 z-10 bg-[#00000084]">
				<Link href={'/'}>
					<Image path="icons/back.svg" alt="back" width={24} height={24} />
				</Link>
				<h1 className="font-bold text-lg">Suraj Sonkar</h1>
			</div>
			<div>
				<div className="relative w-full">
					<div className="w-full aspect-[3/1] relative">
						<Image path="general/cover.jpg" alt="" width={600} height={200} />
					</div>
					<div className="w-1/6 aspect-square rounded-full overflow-hidden border-4 border-black bg-gray-300 absolute left-4 -translate-y-1/2">
						<Image
							path="general/avatar.png"
							alt=""
							width={100}
							height={100}
							tr={true}
						/>
					</div>
				</div>
				<div className="flex w-full items-center justify-end gap-2 p-2">
					<div className="w-9 h-9 flex items-center justify-center rounded-full border-[1px] border-gray-500 cursor-pointer">
						<Image path="icons/more.svg" alt="" width={20} height={20} />
					</div>
					<div className="w-9 h-9 flex items-center justify-center rounded-full border-[1px] border-gray-500 cursor-pointer">
						<Image path="icons/explore.svg" alt="" width={20} height={20} />
					</div>
					<div className="w-9 h-9 flex items-center justify-center rounded-full border-[1px] border-gray-500 cursor-pointer">
						<Image path="icons/message.svg" alt="" width={20} height={20} />
					</div>
					<button className="py-2 px-4 bg-white text-black font-bold rounded-full">
						Follow
					</button>
				</div>
				{/* USER DETAILS */}
				<div className="p-4 flex flex-col gap-2">
					<div className="">
						<h1 className="text-2xl font-bold">Suraj Sonkar</h1>
						<span className="text-textGray text-sm">@surajvsonkar</span>
					</div>
					<p>Suraj Virendra Sonkar</p>
					<div className="text-textGray flex gap-4 text-[15px]">
						<div className="flex items-center gap-2">
							<Image
								path="icons/userLocation.svg"
								alt="location"
								width={20}
								height={20}
							/>
							<span>INDIA</span>
						</div>
						<div className="flex items-center gap-2">
							<Image
								path="icons/date.svg"
								alt="location"
								width={20}
								height={20}
							/>
							<span>Joined July 2025</span>
						</div>
					</div>
					<div className="flex gap-4">
						<div className="flex items-center gap-2">
							<span className="font-bold">100</span>
							<span className="text-textGray text-[15px]">Followers</span>
						</div>
						<div className="flex items-center gap-2">
							<span className="font-bold">100</span>
							<span className="text-textGray text-[15px]">Following</span>
						</div>
					</div>
				</div>
			</div>
            <Feed/>
		</div>
	);
};

export default UserPage;
