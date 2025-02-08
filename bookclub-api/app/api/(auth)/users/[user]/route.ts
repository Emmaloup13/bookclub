/* eslint-disable @typescript-eslint/no-explicit-any */
import connect from "@/lib/db";
import Book from "@/lib/modals/book";
import Comment from "@/lib/modals/comment";
import Genre from "@/lib/modals/genre";
import User from "@/lib/modals/user";
import { Types } from "mongoose";
import { NextResponse } from "next/server";



export const GET = async (request: Request, context: { params: any }) => {
    const params = await context.params;
    const userId = params.user;
    try {
        if (!userId || !Types.ObjectId.isValid(userId)) {
            return new NextResponse(
                JSON.stringify({ message: "Invalid or missing userId" }), { status: 400 }
            );
        }

        await connect();

        const user = await User.findById(userId).populate([{ path: 'genres', model: Genre }, { path: 'books', model: Book }, { path: 'comments', model: Comment }]);

        return new NextResponse(
            JSON.stringify({ message: "User was found", user: user }), { status: 200 }
        );

    } catch (error: unknown) {
        if (error instanceof Error) {
            return new NextResponse(
                JSON.stringify({ message: "Error in getting user by id: " + error.message }), { status: 500 }
            );
        } else {
            return new NextResponse(
                JSON.stringify({ message: "Unknown error occurred" }), { status: 500 }
            );
        }
    }
}