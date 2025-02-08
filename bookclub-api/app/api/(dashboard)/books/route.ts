import connect from "@/lib/db";
import Book from "@/lib/modals/book";
import Comment from "@/lib/modals/comment";
import Genre from "@/lib/modals/genre";
import Status from "@/lib/modals/status";
import User from "@/lib/modals/user";
import { Types } from "mongoose";
import { NextResponse } from "next/server";


export const GET = async (request: Request) => {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    if (status) {
        try {
            await connect();
            // Trouver l'ObjectId correspondant au statut
            console.log(status);
            const statusObj = await Status.findOne({ title: status });
            if (!statusObj) {
                return new NextResponse(
                    JSON.stringify({ message: "Status not found" }), { status: 404 }
                );
            }
            const books = await Book.find({ status: statusObj._id })
            return new NextResponse(JSON.stringify({ books }), { status: 200 });
        } catch (error: unknown) {
            if (error instanceof Error) {
                return new NextResponse(
                    JSON.stringify({ message: "Error in checking status: " + error.message }), { status: 500 }
                );
            } else {
                return new NextResponse(
                    JSON.stringify({ message: "Unknown error occurred" }), { status: 500 }
                );
            }
        }
    } else {
        try {
            await connect();
            const books = await Book.find().populate([{ path: 'genre', model: Genre }, { path: 'readers', model: User }, { path: 'status', model: Status }, { path: 'comments', model: Comment }]);
            return new NextResponse(JSON.stringify(books), { status: 200 });
        } catch (error: unknown) {
            if (error instanceof Error) {
                return new NextResponse(
                    JSON.stringify({ message: "Error in fetching books: " + error.message }), { status: 500 }
                );
            } else {
                return new NextResponse(
                    JSON.stringify({ message: "Unknown error occurred" }), { status: 500 }
                );
            }
        }
    }
};

export const POST = async (request: Request) => {
    try {
        const body = await request.json();
        await connect();
        const newBook = new Book(body);
        await newBook.save();

        await Genre.updateOne({ "_id": newBook.genre }, { $push: { books: newBook._id } });
        await User.updateMany({ "_id": newBook.readers }, { $push: { books: newBook._id } });
        await Status.updateOne({ "_id": newBook.status }, { $push: { books: newBook._id } });
        await Comment.updateMany({ "_id": newBook.comments }, { $push: { book: newBook._id } });

        return new NextResponse(
            JSON.stringify({ message: "Book is created", book: newBook }), { status: 200 }
        );

    } catch (error: unknown) {
        if (error instanceof Error) {
            return new NextResponse(
                JSON.stringify({ message: "Error in creating book: " + error.message }), { status: 500 }
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
        const { bookId, newTitle, newAuthor, newPages, newSummary, newImage, newNote, newGenre, newReaders, newStatus, newComments } = body;

        await connect();
        if (!bookId) {
            return new NextResponse(
                JSON.stringify({ message: "ID not found" }), { status: 404 }
            );
        }

        if (!Types.ObjectId.isValid(bookId)) {
            return new NextResponse(
                JSON.stringify({ message: "Invalid book ID" }), { status: 400 }
            );
        }

        const book = await Book.findById(bookId);
        if (!book) {
            return new NextResponse(
                JSON.stringify({ message: "Book not found in the database" }), { status: 404 }
            );
        }

        const oldStatus = book.status;

        const updatedBook = await Book.findOneAndUpdate(
            { _id: bookId },
            { title: newTitle, author: newAuthor, pages: newPages, summary: newSummary, imageUrl: newImage, note: newNote, genre: newGenre, readers: newReaders, status: newStatus, comments: newComments },
            { new: true }
        );
        // Remove the book from the old status
        await Status.updateOne({ _id: oldStatus }, { $pull: { books: bookId } });

        // Add the book to the new status
        await Status.updateOne({ _id: newStatus }, { $push: { books: bookId } });

        if (!updatedBook) {
            return new NextResponse(
                JSON.stringify({ message: "Book not found in the database" }), { status: 404 }
            );
        }

        return new NextResponse(
            JSON.stringify({ message: "Book is updated", book: updatedBook }), { status: 200 }
        );

    } catch (error: unknown) {
        if (error instanceof Error) {
            return new NextResponse(
                JSON.stringify({ message: "Error in updating book: " + error.message }), { status: 500 }
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
        const bookId = searchParams.get("bookId");

        if (!bookId) {
            return new NextResponse(
                JSON.stringify({ message: "ID not found" }), { status: 400 }
            );
        }

        if (!Types.ObjectId.isValid(bookId)) {
            return new NextResponse(
                JSON.stringify({ message: "Invalid book ID" }), { status: 400 }
            );
        }

        await connect();

        const deletedBook = await Book.findByIdAndDelete(
            new Types.ObjectId(bookId)
        );

        if (!deletedBook) {
            return new NextResponse(
                JSON.stringify({ message: "Book not found in the database" }), { status: 404 }
            );
        }

        // Remove book reference from Genre, User, and Status
        await Genre.updateMany({ books: bookId }, { $pull: { books: bookId } });
        await User.updateMany({ books: bookId }, { $pull: { books: bookId } });
        await Status.updateMany({ books: bookId }, { $pull: { books: bookId } });
        await Comment.deleteMany({ book: bookId });

        return new NextResponse(
            JSON.stringify({ message: "Book is deleted", user: deletedBook }), { status: 200 }
        );

    } catch (error: unknown) {
        if (error instanceof Error) {
            return new NextResponse(
                JSON.stringify({ message: "Error in deleting book: " + error.message }), { status: 500 }
            );
        } else {
            return new NextResponse(
                JSON.stringify({ message: "Unknown error occurred" }), { status: 500 }
            );
        }
    }
} 