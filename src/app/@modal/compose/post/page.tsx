'use client';
import Image from '@/components/Image';
import { useRouter } from 'next/navigation';

const page = () => {
	const router = useRouter();

	const closeModal = () => {
		router.back();
	};
	return (
		<div className="absolute w-screen h-screen top-0 left-0 z-20 bg-[#293139a6] flex justify-center">
			<div className="py-4 px-8 rounded-xl bg-black w-[600px] h-max mt-12">
				<div className='flex justify-between items-center'>
					<div className="cursor-pointer" onClick={closeModal}>
						X
					</div>
					<div className='text-iconBlue font-bold'>Drafts</div>
				</div>
				<div className='py-8 flex gap-4'>
					<div className="relative w-10 h-10 rounded-full overflow-hidden">
						<Image
							path="general/avatar.png"
							alt=""
							width={100}
							height={100}
							tr={true}
						/>
					</div>
					<input className='flex-1 bg-transparent outline-none text-lg' type="text" placeholder="What is happening?!" />
				</div>
				<div className='flex items-center justify-between gap-4 flex-wrap border-t border-borderGray pt-4'>
					<div className='flex gap-4 flex-wrap'>
                        <Image
							path="icons/gif.svg"
							alt=""
							width={20}
							height={20}
							className="cursor-pointer"
						/>
						<Image
							path="icons/poll.svg"
							alt=""
							width={20}
							height={20}
							className="cursor-pointer"
						/>
						<Image
							path="icons/emoji.svg"
							alt=""
							width={20}
							height={20}
							className="cursor-pointer"
						/>
						<Image
							path="icons/schedule.svg"
							alt=""
							width={20}
							height={20}
							className="cursor-pointer"
						/>
						<Image
							path="icons/location.svg"
							alt=""
							width={20}
							height={20}
							className="cursor-pointer"
						/>
                    </div>
					<button className='py-2 px-5 text-black font-bold bg-white rounded-full'>Post</button>
				</div>
			</div>
		</div>
	);
};

export default page;
