import { prisma } from '@/prisma';
import Post from './Post';

const Feed = async () => {
	const posts = await prisma.post.findMany();
  console.log(posts.length)
	return (
		<div className=''>
			{posts.map((post) => {
				return <div key={post.id}>
					<Post />
				</div>;
			})}
		</div>
	);
};

export default Feed;
