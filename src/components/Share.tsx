'use client';

import { useState } from 'react';
import Image from './Image';
import NextImage from 'next/image';
import { shareAction } from '@/actions';
import ImageEditor from './ImageEditor';

const Share = () => {
	const [media, setMedia] = useState<File | null>(null);
	const [isEditorOpen, setIsEditorOpen] = useState(false);
	const [settings, setSettings] = useState<{
		type: 'original' | 'wide' | 'square';
		sensitive: boolean;
	}>({
		type: 'original',
		sensitive: false,
	});

	const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setMedia(e.target.files[0]);
		}
	};

	const previewUrl = media ? URL.createObjectURL(media) : null;

	return (
		<form className="p-4 flex gap-4" action={(formData)=>shareAction(formData,settings)}>
			<div className="relative w-10 h-10 rounded-full overflow-hidden">
				<Image
					path="general/avatar.png"
					alt=""
					width={100}
					height={100}
					tr={true}
				/>
			</div>

			<div className="flex-1 flex flex-col gap-4">
				<input
					name="desc"
					type="text"
					placeholder="What is happening?!"
					className="bg-transparent outline-none placeholder:text-textGray"
				/>
				{previewUrl && (
					<div className="relative rounded-xl overflow-hidden">
						<NextImage
							className={`w-full ${
								settings.type === 'original'
									? 'h-full object-contain'
									: settings.type === 'square'
									? 'aspect-square object-cover'
									: 'aspect-video object-cover'
							}`}
							src={previewUrl}
							alt=""
							width={600}
							height={600}
						/>
						<div
							onClick={() => setIsEditorOpen(true)}
							className="absolute left-2 top-2 bg-black text-white bg-opacity-50 py-1 px-4 rounded-full font-bold text-sm cursor-pointer"
						>
							Edit
						</div>
					</div>
				)}
				{isEditorOpen && previewUrl && (
					<ImageEditor
						onClose={() => setIsEditorOpen(false)}
						previewUrl={previewUrl}
						settings={settings}
						setSettings={setSettings}
					/>
				)}
				<div className="flex items-center justify-between gap-4 flex-wrap">
					<div className="flex gap-4 flex-wrap">
						<input
							name="file"
							onChange={handleMediaChange}
							type="file"
							id="file"
							className="hidden"
						/>
						<label htmlFor="file">
							<Image
								path="icons/image.svg"
								alt=""
								width={20}
								height={20}
								className="cursor-pointer"
							/>
						</label>
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
					<button className="bg-white text-black rounded-full py-2 px-4 font-bold">
						Post
					</button>
				</div>
			</div>
		</form>
	);
};

export default Share;
