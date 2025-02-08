import mongoose, { Schema } from "mongoose";


const CommentSchema = new Schema(
    {
        text: { type: String, required: true },
        author: { type: Schema.Types.ObjectId, ref: "user", required: true, unique: true },
        book: { type: Schema.Types.ObjectId, ref: "book", required: true },
    },
    {
        timestamps: true
    }
)

const Comment = mongoose.model("Comment", CommentSchema);

export default Comment;