import connect from "@/lib/db";
import Book from "@/lib/modals/book";
import User from "@/lib/modals/user";
import Comment from "@/lib/modals/comment";
import { Types } from "mongoose";
import { NextResponse } from "next/server";


export const GET = async () => {
    try {
        await connect();
        const comments = await Comment.find().populate('author book');
        return new NextResponse(JSON.stringify(comments), { status: 200 });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return new NextResponse(
                JSON.stringify({ message: "Error in fetching comments: " + error.message }), { status: 500 }
            );
        } else {
            return new NextResponse(
                JSON.stringify({ message: "Unknown error occurred" }), { status: 500 }
            );
        }
    }
};

export const POST = async (request: Request) => {
    try {
        const body = await request.json();
        await connect();
        const newComment = new Comment(body);
        await newComment.save();

        await User.updateOne({ "_id": newComment.author }, { $push: { comments: newComment._id } });
        await Book.updateOne({ "_id": newComment.book }, { $push: { comments: newComment._id } });

        return new NextResponse(
            JSON.stringify({ message: "Comment is created", comment: newComment }), { status: 200 }
        );
    } catch (error: unknown) {
        if (error instanceof Error) {
            return new NextResponse(
                JSON.stringify({ message: "Error in creating comment: " + error.message }), { status: 500 }
            );
        } else {
            return new NextResponse(
                JSON.stringify({ message: "Unknown error occurred" }), { status: 500 }
            );
        }
    }
};

export const PATCH = async (request: Request) => {
    try {
        const body = await request.json();
        const { commentId, newText } = body;

        await connect();
        if (!commentId) {
            return new NextResponse(
                JSON.stringify({ message: "ID not found" }), { status: 404 }
            );
        }


        if (!Types.ObjectId.isValid(commentId)) {
            return new NextResponse(
                JSON.stringify({ message: "Invalid comment ID" }), { status: 400 }
            );
        }

        const updatedComment = await Comment.findOneAndUpdate(
            { _id: commentId },
            { text: newText },
            { new: true }
        );

        if (!updatedComment) {
            return new NextResponse(
                JSON.stringify({ message: "Comment not found in the database" }), { status: 404 }
            );
        }

        return new NextResponse(
            JSON.stringify({ message: "Comment is updated", comment: updatedComment }), { status: 200 }
        );

    } catch (error: unknown) {
        if (error instanceof Error) {
            return new NextResponse(
                JSON.stringify({ message: "Error in updating comment: " + error.message }), { status: 500 }
            );
        } else {
            return new NextResponse(
                JSON.stringify({ message: "Unknown error occurred" }), { status: 500 }
            );
        }
    }

};

export const DELETE = async (request: Request) => {
    try {
        const { searchParams } = new URL(request.url);
        const commentId = searchParams.get("commentId");

        if (!commentId) {
            return new NextResponse(
                JSON.stringify({ message: "ID not found" }), { status: 400 }
            );
        }

        if (!Types.ObjectId.isValid(commentId)) {
            return new NextResponse(
                JSON.stringify({ message: "Invalid comment ID" }), { status: 400 }
            );
        }

        await connect();

        const deletedComment = await Comment.findByIdAndDelete(
            new Types.ObjectId(commentId)
        );

        if (!deletedComment) {
            return new NextResponse(
                JSON.stringify({ message: "Comment not found in the database" }), { status: 404 }
            );
        }

        // Remove comment reference from User and Book
        await User.updateOne({ comments: commentId }, { $pull: { comments: commentId } });
        await Book.updateOne({ comments: commentId }, { $pull: { comments: commentId } });

        return new NextResponse(
            JSON.stringify({ message: "Comment is deleted", comment: deletedComment }), { status: 200 }
        );

    } catch (error: unknown) {
        if (error instanceof Error) {
            return new NextResponse(
                JSON.stringify({ message: "Error in deleting comment: " + error.message }), { status: 500 }
            );
        } else {
            return new NextResponse(
                JSON.stringify({ message: "Unknown error occurred" }), { status: 500 }
            );
        }
    }
} 