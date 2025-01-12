/* eslint-disable @typescript-eslint/no-explicit-any */
import connect from "@/lib/db";
import Status from "@/lib/modals/status";
import { Types } from "mongoose";
import { NextResponse } from "next/server";



export const GET = async (request: Request, context: { params: any }) => {
    const params = await context.params;
    const statusId = params.status;
    try {
        if (!statusId || !Types.ObjectId.isValid(statusId)) {
            return new NextResponse(
                JSON.stringify({ message: "Invalid or missing statusId" }), { status: 400 }
            );
        }

        await connect();

        const status = await Status.findById(statusId).populate("books");

        return new NextResponse(
            JSON.stringify({ message: "Status was found", status: status }), { status: 200 }
        );

    } catch (error: unknown) {
        if (error instanceof Error) {
            return new NextResponse(
                JSON.stringify({ message: "Error in getting status by id: " + error.message }), { status: 500 }
            );
        } else {
            return new NextResponse(
                JSON.stringify({ message: "Unknown error occurred" }), { status: 500 }
            );
        }
    }
}