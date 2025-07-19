'use server';

import ImageKit from 'imagekit';

const imageKit = new ImageKit({
	publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
	privateKey: process.env.NEXT_PUBLIC_IMAGEKIT_PRIVATE_KEY,
	urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT,
});

export const shareAction = async (
	formData: FormData,
	settings: { type: 'original' | 'wide' | 'square'; sensitive: boolean }
) => {
	console.log('hello');
	const file = formData.get('file') as File;

	const bytes = await file.arrayBuffer();
	const buffer = Buffer.from(bytes);

    const transformation = `w-600, ${
        settings.type === "square"
        ? "ar-1-1"
        : settings.type === "wide"
        ? "ar-16-9"
        : ""
    }`

	imageKit.upload(
		{
			file: buffer,
			fileName: file.name,
			folder: '/posts',
			transformation: {
				pre: transformation,
			},
		},
		function (err, result) {
			if (err) console.log(err);
			else console.log(result);
		}
	);
};
