import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	// Create 5 users with unique details
	const users = [];
	for (let i = 1; i <= 5; i++) {
		const user = await prisma.user.create({
			data: {
				id: `user${i}`,
				email: `user${i}@example.com`,
				username: `user${i}`,
				displayName: `User ${i}`,
				bio: `Hi I'm user${i}. Welcome to my profile!`,
				location: `USA`,
				job: `Developer`,
				website: `google.com`,
			},
		});
		users.push(user);
	}
	console.log(`${users.length} users created.`);

	// Create 5 posts for each user
	const posts = [];
	for (let i = 0; i < users.length; i++) {
		for (let j = 1; j <= 5; j++) {
			const post = await prisma.post.create({
				data: {
					description: `Post ${j} by ${users[i].username}`,
					userId: users[i].id,
				},
			});
			posts.push(post);
		}
	}
	console.log('Posts created.');

	// Create some follows
	await prisma.follow.createMany({
		data: [
			{ followerId: users[0].id, followingId: users[1].id },
			{ followerId: users[0].id, followingId: users[2].id },
			{ followerId: users[1].id, followingId: users[3].id },
			{ followerId: users[2].id, followingId: users[4].id },
			{ followerId: users[3].id, followingId: users[0].id },
		],
	});
	console.log('Follows created.');

	// Create some likes
	await prisma.like.createMany({
		data: [
			{ userId: users[0].id, postId: posts[0].id },
			{ userId: users[1].id, postId: posts[1].id },
			{ userId: users[2].id, postId: posts[2].id },
			{ userId: users[3].id, postId: posts[3].id },
			{ userId: users[4].id, postId: posts[4].id },
		],
	});
	console.log('Likes created.');

	// Create some comments (each comment is a post linked to a parent post)
	const comments = [];
	for (let i = 0; i < posts.length; i++) {
		const comment = await prisma.post.create({
			data: {
				description: `Comment on Post ${posts[i].id} by ${
					users[(i + 1) % 5].username
				}`,
				userId: users[(i + 1) % 5].id,
				parentPostId: posts[i].id, // Linking the comment to the post
			},
		});
		comments.push(comment);
	}
	console.log('Comments created.');

	// Create reposts using the Post model's rePostId
	const reposts = [];
	for (let i = 0; i < posts.length; i++) {
		const repost = await prisma.post.create({
			data: {
				description: `Repost of Post ${posts[i].id} by ${users[(i + 2) % 5].username}`,
				userId: users[(i + 2) % 5].id, // The user who is reposting
				rePostId: posts[i].id, // Linking to the original post being reposted
			},
		});
		reposts.push(repost);
	}
	console.log('Reposts created.');

	// Create saved posts (users save posts they like)
	await prisma.savedPosts.createMany({
		data: [
			{ userId: users[0].id, postId: posts[1].id },
			{ userId: users[1].id, postId: posts[2].id },
			{ userId: users[2].id, postId: posts[3].id },
			{ userId: users[3].id, postId: posts[4].id },
			{ userId: users[4].id, postId: posts[0].id },
		],
	});
	console.log('Saved posts created.');
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
