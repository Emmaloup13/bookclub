import { Schema, model, models } from "mongoose";


const BookSchema = new Schema(
    {
        title: { type: "string", required: true, unique: true },
        author: { type: "string", required: true },
        pages: { type: "number", required: true },
        summary: { type: "string", required: true },
        imageUrl: { type: "string", required: false },
        note: { type: "number", required: false },
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