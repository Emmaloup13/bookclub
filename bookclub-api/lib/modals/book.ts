import { Schema, model, models } from "mongoose";


const BookSchema = new Schema(
    {
        title: { type: String, required: true, unique: true },
        author: { type: String, required: true },
        pages: { type: Number, required: true },
        summary: { type: String, required: true },
        imageUrl: { type: String, required: false },
        note: [{ type: Number, required: false }],
        genre: { type: Schema.Types.ObjectId, ref: "Genre" },
        readers: [{ type: Schema.Types.ObjectId, ref: "User" }],
        status: { type: Schema.Types.ObjectId, ref: "Status" },
        comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }]
    },
    {
        timestamps: true
    }
)

const Book = models.Book || model("Book", BookSchema);

export default Book;