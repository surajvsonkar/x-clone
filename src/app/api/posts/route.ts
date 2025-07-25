import { prisma } from "@/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest){
    const searchParams = request.nextUrl.searchParams

    const userProfileId = searchParams.get("user")
    const page = searchParams.get("cursor")
    const LIMIT = 3
    const {userId} = await auth()
    if(!userId) return;

    const whereCondition = userProfileId !== "undefined" ? {parentPostId: null,userId: userProfileId as string} : {
        parentPostId: null,
        userId: {
            in: [
                userId,
                ...(
                    await prisma.follow.findMany({
                        where: {followingId: userId},
                        select: {followingId: true}
                    })
                ).map(f=>f.followingId)
            ]
        }
    }

    const posts = await prisma.post.findMany({
        where: whereCondition,
        take: LIMIT,
        skip: (Number(page) - 1) * LIMIT
    })

    const totalPosts = await prisma.post.count({
        where: whereCondition
    })

    const hasMore = Number(page) * LIMIT < totalPosts

    return NextResponse.json({
        posts,
        hasMore
    })
}