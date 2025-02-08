import mongoose, { Schema } from "mongoose";
import User from './user';
import Book from "./book";

const CommentSchema: Schema = new Schema(
    {
        text: { type: String, required: true },
        author: { type: Schema.Types.ObjectId, ref: User, required: true, unique: true },
        book: { type: Schema.Types.ObjectId, ref: Book, required: true },
    },
    {
        timestamps: true
    }
)

const Comment = mongoose.model("Comment", CommentSchema);

export default Comment;