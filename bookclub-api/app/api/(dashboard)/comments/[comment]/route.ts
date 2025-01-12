/* eslint-disable @typescript-eslint/no-explicit-any */
import connect from "@/lib/db";
import Comment from "@/lib/modals/comment";
import { Types } from "mongoose";
import { NextResponse } from "next/server";



export const GET = async (request: Request, context: { params: any }) => {
    const params = await context.params;
    const commentId = params.comment;
    try {
        if (!commentId || !Types.ObjectId.isValid(commentId)) {
            return new NextResponse(
                JSON.stringify({ message: "Invalid or missing commentId" }), { status: 400 }
            );
        }

        await connect();

        const comment = await Comment.findById(commentId).populate("author book");

        return new NextResponse(
            JSON.stringify({ message: "Comment was found", comment: comment }), { status: 200 }
        );

    } catch (error: unknown) {
        if (error instanceof Error) {
            return new NextResponse(
                JSON.stringify({ message: "Error in getting comment by id: " + error.message }), { status: 500 }
            );
        } else {
            return new NextResponse(
                JSON.stringify({ message: "Unknown error occurred" }), { status: 500 }
            );
        }
    }
}