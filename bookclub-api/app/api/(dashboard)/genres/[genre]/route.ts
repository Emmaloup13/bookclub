/* eslint-disable @typescript-eslint/no-explicit-any */
import connect from "@/lib/db";
import Genre from "@/lib/modals/genre";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

export const GET = async (request: Request, context: { params: any }) => {
    const params = await context.params;
    const genreId = params.genre;
    try {
        if (!genreId || !Types.ObjectId.isValid(genreId)) {
            return new NextResponse(
                JSON.stringify({ message: "Invalid or missing genreID" }), { status: 400 }
            );
        }

        await connect();

        const genre = await Genre.findById(genreId);


        return new NextResponse(
            JSON.stringify({ message: "Genre was found", genre: genre }), { status: 200 }
        );

    } catch (error: unknown) {
        if (error instanceof Error) {
            return new NextResponse(
                JSON.stringify({ message: "Error in getting genre by id: " + error.message }), { status: 500 }
            );
        } else {
            return new NextResponse(
                JSON.stringify({ message: "Unknown error occurred" }), { status: 500 }
            );
        }
    }
}

