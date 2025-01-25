import { Schema, model, models } from "mongoose";


const CommentSchema = new Schema(
    {
        text: { type: String, required: true },
        author: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
        book: { type: Schema.Types.ObjectId, ref: "Book", required: true },
    },
    {
        timestamps: true
    }
)

const Comment = models.Comment || model("Comment", CommentSchema);

export default Comment;