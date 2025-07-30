'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import Image from './Image';
import NextImage from 'next/image';
import { shareAction } from '@/actions';
import ImageEditor from './ImageEditor';
import { success } from 'zod';
import { error } from 'console';
import { useUser } from '@clerk/nextjs';
import { addPost } from '@/action';

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

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		await shareAction(formData, settings);
	};

	const previewUrl = media ? URL.createObjectURL(media) : null;

	const { user } = useUser();

	const [state, formAction, isPending] = useActionState(addPost, {
		success: false,
		error: false,
	});

	const formRef = useRef<HTMLFormElement | null>(null)

	useEffect(()=> {
		if(state.success) formRef.current?.reset()
	}, [state])

	return (
		<form ref={formRef} className="p-4 flex gap-4" action={formAction}>
			<div className="relative w-10 h-10 rounded-full overflow-hidden">
				<Image src={user?.imageUrl} alt="" width={100} height={100} tr={true} />
			</div>

			<div className="flex-1 flex flex-col gap-4">
				<input
					type="text"
					name="imgType"
					value={settings.type}
					hidden
					readOnly
				/>
				<input
					type="text"
					name="isSensitive"
					value={settings.sensitive ? 'true' : 'false'}
					hidden
					readOnly
				/>
				<input
					name="desc"
					type="text"
					placeholder="What is happening?!"
					className="bg-transparent outline-none placeholder:text-textGray"
				/>
				{media?.type.includes('image') && previewUrl && (
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
						<div
							className="absolute right-2 top-2 bg-black font-bold text-sm text-white cursor-pointer bg-opacity-50 flex justify-center items-center h-8 w-8 rounded-full"
							onClick={() => setMedia(null)}
						>
							X
						</div>
					</div>
				)}
				{media?.type.includes('video') && previewUrl && (
					<div className="relative">
						<video src={previewUrl} controls />
						<div
							className="absolute right-2 top-2 bg-black font-bold text-sm text-white cursor-pointer bg-opacity-50 flex justify-center items-center h-8 w-8 rounded-full"
							onClick={() => setMedia(null)}
						>
							X
						</div>
					</div>
				)}
				{isEditorOpen && previewUrl && (
					<ImageEditor
						onClose={() => setIsEditorOpen(false)}
						previewUrl={previewUrl!}
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
							accept="image/*,video/*"
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
					<button className="bg-white text-black rounded-full py-2 px-4 font-bold disabled:cursor-not-allowed" disabled={isPending}>
						{isPending ? "posting": "post"}
					</button>
					{state.error && <span className='text-red-300 p-4'>Something went wrong!</span>}
				</div>
			</div>
		</form>
	);
};

export default Share;
