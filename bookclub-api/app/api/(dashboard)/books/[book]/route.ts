/* eslint-disable @typescript-eslint/no-explicit-any */
import connect from "@/lib/db";
import Book from "@/lib/modals/book";
import { Types } from "mongoose";
import { NextResponse } from "next/server";



export const GET = async (request: Request, context: { params: any }) => {
    const params = await context.params;
    const bookId = params.book;
    try {
        if (!bookId || !Types.ObjectId.isValid(bookId)) {
            return new NextResponse(
                JSON.stringify({ message: "Invalid or missing bookId" }), { status: 400 }
            );
        }

        await connect();

        const book = await Book.findById(bookId).populate("genre readers status comments");

        return new NextResponse(
            JSON.stringify({ message: "Book was found", book: book }), { status: 200 }
        );

    } catch (error: unknown) {
        if (error instanceof Error) {
            return new NextResponse(
                JSON.stringify({ message: "Error in getting book by id: " + error.message }), { status: 500 }
            );
        } else {
            return new NextResponse(
                JSON.stringify({ message: "Unknown error occurred" }), { status: 500 }
            );
        }
    }
}

