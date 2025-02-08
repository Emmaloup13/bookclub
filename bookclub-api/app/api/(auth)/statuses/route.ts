import connect from "@/lib/db";
import Book from "@/lib/modals/book";
import Status from "@/lib/modals/status";
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
            return new NextResponse(JSON.stringify({ statusObj }), { status: 200 });
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
            const statuses = await Status.find().populate({ path: 'books', model: Book });
            return new NextResponse(JSON.stringify(statuses), { status: 200 });
        } catch (error: unknown) {
            if (error instanceof Error) {
                return new NextResponse(
                    JSON.stringify({ message: "Error in fetching statuses: " + error.message }), { status: 500 }
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
        const newStatus = new Status(body);
        await newStatus.save();

        await Book.updateMany({ "_id": newStatus.books }, { $set: { status: newStatus._id } })

        return new NextResponse(
            JSON.stringify({ message: "Status is created", status: newStatus }), { status: 200 }
        );
    } catch (error: unknown) {
        if (error instanceof Error) {
            return new NextResponse(
                JSON.stringify({ message: "Error in creating status: " + error.message }), { status: 500 }
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
        const { statusId, newTitle, newBooks } = body;

        await connect();
        if (!statusId) {
            return new NextResponse(
                JSON.stringify({ message: "ID not found" }), { status: 404 }
            );
        }

        if (!Types.ObjectId.isValid(statusId)) {
            return new NextResponse(
                JSON.stringify({ message: "Invalid status ID" }), { status: 400 }
            );
        }

        const updatedStatus = await Status.findOneAndUpdate(
            { _id: statusId },
            { title: newTitle, books: newBooks },
            { new: true }
        );

        if (!updatedStatus) {
            return new NextResponse(
                JSON.stringify({ message: "Status not found in the database" }), { status: 400 }
            );
        }

        return new NextResponse(
            JSON.stringify({ message: "Status is updated", status: updatedStatus }), { status: 200 }
        );

    } catch (error: unknown) {
        if (error instanceof Error) {
            return new NextResponse(
                JSON.stringify({ message: "Error in updating status: " + error.message }), { status: 500 }
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
        const statusId = searchParams.get("statusId");

        if (!statusId) {
            return new NextResponse(
                JSON.stringify({ message: "ID not found" }), { status: 404 }
            );
        }

        if (!Types.ObjectId.isValid(statusId)) {
            return new NextResponse(
                JSON.stringify({ message: "Invalid status ID" }), { status: 400 }
            );
        }

        await connect();

        const deletedStatus = await Status.findByIdAndDelete(
            new Types.ObjectId(statusId)
        );

        if (!deletedStatus) {
            return new NextResponse(
                JSON.stringify({ message: "Status not found in the database" }), { status: 404 }
            );
        }

        // Remove status reference from Book
        await Book.updateMany({ status: statusId }, { $pull: { status: statusId } });

        return new NextResponse(
            JSON.stringify({ message: "Status is deleted", status: deletedStatus }), { status: 200 }
        );

    } catch (error: unknown) {
        if (error instanceof Error) {
            return new NextResponse(
                JSON.stringify({ message: "Error in deleting status: " + error.message }), { status: 500 }
            );
        } else {
            return new NextResponse(
                JSON.stringify({ message: "Unknown error occurred" }), { status: 500 }
            );
        }
    }
} 