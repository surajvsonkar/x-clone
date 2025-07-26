import Comments from '@/components/Comments';
import Image from '@/components/Image';
import Post from '@/components/Post';
import { prisma } from '@/prisma';
import { auth } from '@clerk/nextjs/server';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const StatusPage = async({params}: {params: Promise<{username:string,postId:string}>}) => {

	const postId = (await params).postId
	const {userId} = await auth()
	
	if(!userId) return;
	const post = await prisma.post.findFirst({
		where: {
			id: Number(postId)
		},
		include:{
			user: {select:{displayName:true,username:true,img:true}},
			_count: {select:{likes:true,rePosts:true,comments:true}},
			likes: {where:{userId:userId},select:{id: true}},
			rePosts: {where:{userId:userId},select:{id: true}},
			saves: {where:{userId:userId},select:{id: true}},
		}
	})
	if(!post) return notFound();
	return (
		<div>
			<div className="flex items-center gap-8 p-4 top-0 sticky backdrop:blur-md bg-[#00000084]">
				<Link href={'/'}>
					<Image path="icons/back.svg" alt="back" width={24} height={24} />
				</Link>
				<h1 className="font-bold text-lg">Post</h1>
			</div>
            <Post type="status" post={post} />
            {/* <Comments/> */}
		</div>
	);
};

export default StatusPage;
