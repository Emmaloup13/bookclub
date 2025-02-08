import connect from "@/lib/db";
import Book from "@/lib/modals/book";
import Genre from "@/lib/modals/genre";
import User from "@/lib/modals/user";
import Comment from "@/lib/modals/comment";
import { Types } from "mongoose";
import { NextResponse } from "next/server";


export const GET = async (request: Request) => {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');

    if (username) {
        try {
            await connect();
            const user = await User.findOne({ username });
            const exists = !!user;
            return new NextResponse(JSON.stringify({ exists }), { status: 200 });
        } catch (error: unknown) {
            if (error instanceof Error) {
                return new NextResponse(
                    JSON.stringify({ message: "Error in checking username: " + error.message }), { status: 500 }
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
            const users = await User.find().populate([{ path: 'genres', model: Genre }, { path: 'books', model: Book }, { path: 'comments', model: Comment }]);
            return new NextResponse(JSON.stringify(users), { status: 200 });
        } catch (error: unknown) {
            if (error instanceof Error) {
                return new NextResponse(
                    JSON.stringify({ message: "Error in fetching users: " + error.message }), { status: 500 }
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
        const newUser = new User(body);
        await newUser.save();

        await Book.updateMany({ "_id": newUser.books }, { $push: { readers: newUser._id } });
        await Genre.updateMany({ "_id": newUser.genres }, { $push: { readers: newUser._id } });

        return new NextResponse(
            JSON.stringify({ message: "User is created", user: newUser }), { status: 200 }
        );
    } catch (error: unknown) {
        if (error instanceof Error) {
            return new NextResponse(
                JSON.stringify({ message: "Error in creating users: " + error.message }), { status: 500 }
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
        const { userId, newUsername, newImageUrl, newGenres, newReaders, newBooks, newComments } = body;

        await connect();
        if (!userId || !newUsername) {
            return new NextResponse(
                JSON.stringify({ message: "ID or new username not found" }), { status: 400 }
            );
        }


        if (!Types.ObjectId.isValid(userId)) {
            return new NextResponse(
                JSON.stringify({ message: "Invalid user ID" }), { status: 400 }
            );
        }

        const updatedUser = await User.findOneAndUpdate(
            { _id: userId },
            { username: newUsername, imageUrl: newImageUrl, genres: newGenres, readers: newReaders, books: newBooks, comments: newComments },
            { new: true }
        ).populate([{ path: 'genres', model: Genre }, { path: 'books', model: Book }, { path: 'comments', model: Comment }]);

        await Book.updateMany({ "_id": { $in: newBooks } }, { $push: { readers: userId } });
        await Comment.updateMany({ "_id": { $in: newComments } }, { $push: { author: userId } });


        if (!updatedUser) {
            return new NextResponse(
                JSON.stringify({ message: "User not found in the database" }), { status: 400 }
            );
        }

        return new NextResponse(
            JSON.stringify({ message: "User is updated", user: updatedUser }), { status: 200 }
        );

    } catch (error: unknown) {
        if (error instanceof Error) {
            return new NextResponse(
                JSON.stringify({ message: "Error in updating users: " + error.message }), { status: 500 }
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
        const userId = searchParams.get("userId");

        if (!userId) {
            return new NextResponse(
                JSON.stringify({ message: "ID not found" }), { status: 400 }
            );
        }

        if (!Types.ObjectId.isValid(userId)) {
            return new NextResponse(
                JSON.stringify({ message: "Invalid user ID" }), { status: 400 }
            );
        }

        await connect();

        const deletedUser = await User.findByIdAndDelete(
            new Types.ObjectId(userId)
        );

        if (!deletedUser) {
            return new NextResponse(
                JSON.stringify({ message: "User not found in the database" }), { status: 404 }
            );
        }

        // Remove user reference from Genre and Book
        await Genre.updateMany({ readers: userId }, { $pull: { readers: userId } });
        await Book.updateMany({ readers: userId }, { $pull: { readers: userId } });
        await Comment.deleteMany({ author: userId });

        return new NextResponse(
            JSON.stringify({ message: "User is deleted", user: deletedUser }), { status: 200 }
        );

    } catch (error: unknown) {
        if (error instanceof Error) {
            return new NextResponse(
                JSON.stringify({ message: "Error in deleting users: " + error.message }), { status: 500 }
            );
        } else {
            return new NextResponse(
                JSON.stringify({ message: "Unknown error occurred" }), { status: 500 }
            );
        }
    }
} 