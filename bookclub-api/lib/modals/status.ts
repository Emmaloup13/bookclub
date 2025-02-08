import mongoose, { Schema } from "mongoose";
import Book from "./book";

const StatusSchema: Schema = new Schema(
    {
        title: { type: String, required: true, unique: true },
        books: [{ type: Schema.Types.ObjectId, ref: Book }]
    },
    {
        timestamps: true
    }
)

const Status = mongoose.model('Status', StatusSchema);

export default Status;