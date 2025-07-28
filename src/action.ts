"use server"

import { auth } from "@clerk/nextjs/server"
import { prisma } from "./prisma";

export const LikePost = async (postId: number)=> {
    const {userId} = await auth()

    if(!userId) return;

    const existingLike = await prisma.like.findFirst({
        where: {
            userId: userId,
            postId: postId
        }
    })

    if(existingLike) {
        await prisma.like.delete({
            where:{id:existingLike.id}
        })
    } else {
        await prisma.like.create({
            data: {
                userId,
                postId
            }
        })
    }
}

export const rePost = async (postId: number)=> {
    const {userId} = await auth()

    if(!userId) return;

    const existingRePost = await prisma.post.findFirst({
        where: {
            userId: userId,
            rePostId: postId
        }
    })

    if(existingRePost) {
        await prisma.post.delete({
            where:{id:existingRePost.id}
        })
    } else {
        await prisma.post.create({
            data: {
                userId,
                rePostId:postId
            }
        })
    }
}

export const savePost = async (postId: number)=> {
    const {userId} = await auth()

    if(!userId) return;

    const existingSavePost = await prisma.savedPosts.findFirst({
        where: {
            userId: userId,
            postId: postId
        }
    })

    if(existingSavePost) {
        await prisma.savedPosts.delete({
            where:{id:existingSavePost.id}
        })
    } else {
        await prisma.savedPosts.create({
            data: {
                userId,
                postId
            }
        })
    }
}