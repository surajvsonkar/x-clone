import ImageKit from 'imagekit';

export const imageKit = new ImageKit({
	publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
	privateKey: process.env.NEXT_PUBLIC_IMAGEKIT_PRIVATE_KEY,
	urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT,
});