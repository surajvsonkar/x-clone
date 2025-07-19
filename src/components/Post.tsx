import { imageKit } from '@/utils';
import Image from './Image';
import PostInfo from './PostInfo';
import PostInteraction from './PostInteraction';
import Video from './Video';

interface FileDetailsResponseTypes {
	width: number;
	height: number;
	filePath: string;
	url: string;
	fileType: string;
	customMetadata: { sensitive: boolean };
}

const Post = async (fileId: string) => {
	const getFileDetails = async (
		fileId: string
	): Promise<FileDetailsResponseTypes> => {
		return new Promise((resolve, reject) => {
			imageKit.getFileDetails(fileId, (err, result) => {
				if (err) reject(err);
				else resolve(result as FileDetailsResponseTypes);
			});
		});
	};

	const fileDetails = await getFileDetails('687bedde5c7cd75eb8b690e7');
	// console.log(fileDetails)

	return (
		<div className="p-4 border-y-[1px] border-borderGray">
			<div className="flex items-center gap-2 text-sm text-textGray mb-2 font-bold">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="18"
					height="18"
					viewBox="0 0 24 24"
				>
					<path
						fill="#71767b"
						d="M4.75 3.79l4.603 4.3-1.706 1.82L6 8.38v7.37c0 .97.784 1.75 1.75 1.75H13V20H7.75c-2.347 0-4.25-1.9-4.25-4.25V8.38L1.853 9.91.147 8.09l4.603-4.3zm11.5 2.71H11V4h5.25c2.347 0 4.25 1.9 4.25 4.25v7.37l1.647-1.53 1.706 1.82-4.603 4.3-4.603-4.3 1.706-1.82L18 15.62V8.25c0-.97-.784-1.75-1.75-1.75z"
					/>
				</svg>
				<span>Suraj reposted</span>
			</div>
			<div className="flex gap-4">
				<div className="relative w-10 h-10 rounded-full overflow-hidden">
					<Image path="general/avatar.png" alt="" width={100} height={100} />
				</div>
				<div className="flex-1 flex flex-col gap-2">
					<div className="flex justify-between items-center gap-2">
						<div className="flex items-center gap-2 flex-wrap">
							<h1 className="text-md font-bold">suraj sonkar</h1>
							<span className="text-textGray">@msurajhu</span>
							<span className="text-textGray">1 day ago</span>
						</div>
						<PostInfo />
					</div>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
						quasi, pariatur temporibus aliquid velit deleniti, quas ipsam
						deserunt eos officia esse amet labore natus repellat nihil!
						Necessitatibus nostrum laborum quaerat?
					</p>
					{/* <Image path={fileDetails.filePath} alt="" width={600} height={600} className={fileDetails.customMetadata.sensitive ? " blur-md" : ""} />
					<PostInteraction /> */}
					{fileDetails && fileDetails.fileType === "image" ? (
						<Image
							path={fileDetails.filePath}
							width={fileDetails.width}
							height={fileDetails.height}
							alt=""
							className={fileDetails.customMetadata.sensitive ? ' blur-md' : ''}
						/>
					) : (
						<Video
							path={fileDetails.filePath}
							className={fileDetails.customMetadata.sensitive ? ' blur-md' : ''}
						/>
					)}
					<PostInteraction />
				</div>
			</div>
		</div>
	);
};

export default Post;
