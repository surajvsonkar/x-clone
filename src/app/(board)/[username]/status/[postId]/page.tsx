import Comments from '@/components/Comments';
import Image from '@/components/Image';
import Post from '@/components/Post';
import Link from 'next/link';

const StatusPage = () => {
	return (
		<div>
			<div className="flex items-center gap-8 p-4 top-0 sticky backdrop:blur-md bg-[#00000084]">
				<Link href={'/'}>
					<Image path="icons/back.svg" alt="back" width={24} height={24} />
				</Link>
				<h1 className="font-bold text-lg">Post</h1>
			</div>
            <Post type="status"/>
            <Comments/>
		</div>
	);
};

export default StatusPage;
