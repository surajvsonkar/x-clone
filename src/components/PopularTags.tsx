import React from 'react';
import Image from './Image';

const PopularTags = () => {
	return (
		<div className="p-4 rounded-2xl border-[1px] border-borderGray flex flex-col gap-4">
			<h1 className="text-xl font-bold text-textGrayLight">What's Happeing</h1>
			<div className="flex gap-4">
				<div className="relative w-20 rounded-xl overflow-hidden">
					<Image
						path="general/post.jpeg"
						alt="event"
						width={120}
						height={120}
					/>
				</div>
				<div className="flex-1">
					<h2 className="font-bold text-textGrayLight">
						Himalaya tracking season
					</h2>
					<span className="text-sm text-textGray">Next Month</span>
				</div>
			</div>
			<div className="">
				<div className="flex items-center justify-between">
					<span className='text-textGray text-sm'>Technology + Trending</span>
					<Image path="icons/infoMore.svg" alt="" width={16} height={16} />
				</div>
                    <h2 className='text-textGrayLight font-bold'>OpenAI</h2>
                    <span className='text-textGray text-sm'>20k posts</span>
			</div>
			<div className="">
				<div className="flex items-center justify-between">
					<span className='text-textGray text-sm'>Technology + Trending</span>
					<Image path="icons/infoMore.svg" alt="" width={16} height={16} />
				</div>
                    <h2 className='text-textGrayLight font-bold'>OpenAI</h2>
                    <span className='text-textGray text-sm'>20k posts</span>
			</div>
			<div className="">
				<div className="flex items-center justify-between">
					<span className='text-textGray text-sm'>Technology + Trending</span>
					<Image path="icons/infoMore.svg" alt="" width={16} height={16} />
				</div>
                    <h2 className='text-textGrayLight font-bold'>OpenAI</h2>
                    <span className='text-textGray text-sm'>20k posts</span>
			</div>
			<div className="">
				<div className="flex items-center justify-between">
					<span className='text-textGray text-sm'>Technology + Trending</span>
					<Image path="icons/infoMore.svg" alt="" width={16} height={16} />
				</div>
                    <h2 className='text-textGrayLight font-bold'>OpenAI</h2>
                    <span className='text-textGray text-sm'>20k posts</span>
			</div>
		</div>
	);
};

export default PopularTags;
