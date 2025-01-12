import connect from "@/lib/db";
import Book from "@/lib/modals/book";
import Genre from "@/lib/modals/genre";
import User from "@/lib/modals/user";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        await connect();
        const genres = await Genre.find();
        return new NextResponse(JSON.stringify(genres), { status: 200 });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return new NextResponse(
                JSON.stringify({ message: "Error in fetching genres: " + error.message }), { status: 500 }
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
        const newGenre = new Genre(body);
        await newGenre.save();

        await Book.updateMany({ "_id": newGenre.books }, { $push: { genre: newGenre._id } });
        await User.updateMany({ "_id": newGenre.readers }, { $push: { genres: newGenre._id } });

        return new NextResponse(
            JSON.stringify({ message: "Genre is created", genre: newGenre }), { status: 200 }
        );
    } catch (error: unknown) {
        if (error instanceof Error) {
            return new NextResponse(
                JSON.stringify({ message: "Error in creating genre: " + error.message }), { status: 500 }
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
        const { genreId, newTitle } = body;

        if (!genreId || !Types.ObjectId.isValid(genreId)) {
            return new NextResponse(
                JSON.stringify({ message: "Invalid or missing genreID" }), { status: 400 }
            );
        }

        await connect();

        const genre = await Genre.findById(genreId);

        if (!genre) {
            return new NextResponse(
                JSON.stringify({ message: "Genre not found" }), { status: 400 }
            );
        }

        const updatedGenre = await Genre.findByIdAndUpdate(
            genreId,
            { title: newTitle },
            { new: true }
        )


        return new NextResponse(
            JSON.stringify({ message: "Genre is updated", user: updatedGenre }), { status: 200 }
        );

    } catch (error: unknown) {
        if (error instanceof Error) {
            return new NextResponse(
                JSON.stringify({ message: "Error in updating genre: " + error.message }), { status: 500 }
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
        const genreId = searchParams.get("genreId");

        if (!genreId || !Types.ObjectId.isValid(genreId)) {
            return new NextResponse(
                JSON.stringify({ message: "Invalid or missing genreID" }), { status: 400 }
            );
        }

        await connect();

        const deletedGenre = await Genre.findByIdAndDelete(new Types.ObjectId(genreId));

        if (!deletedGenre) {
            return new NextResponse(
                JSON.stringify({ message: "Genre not found in the database" }), { status: 404 }
            );
        }

        // Remove genre reference from User and Book
        await User.updateMany({ genres: genreId }, { $pull: { genres: genreId } });
        await Book.updateMany({ genre: genreId }, { $pull: { genre: genreId } });

        return new NextResponse(
            JSON.stringify({ message: "Genre is deleted" }), { status: 200 }
        );

    } catch (error: unknown) {
        if (error instanceof Error) {
            return new NextResponse(
                JSON.stringify({ message: "Error in deleting genre: " + error.message }), { status: 500 }
            );
        } else {
            return new NextResponse(
                JSON.stringify({ message: "Unknown error occurred" }), { status: 500 }
            );
        }
    }
}