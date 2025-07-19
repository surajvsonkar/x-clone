'use client';

import { IKVideo } from 'imagekitio-next';

const urlEndPoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

interface videoTypes {
	path: string;
	className: string;
}

const Video = ({ path, className }: videoTypes) => {
	return (
		<IKVideo
			urlEndpoint={urlEndPoint}
			className={className}
			path={path}
			transformation={[{ width: '1920', height: '1000', quality: 90}]}
            controls={true}
		>
			Video
		</IKVideo>
	);
};

export default Video;
