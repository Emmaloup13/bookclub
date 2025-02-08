import mongoose, { Schema } from "mongoose";


const BookSchema = new Schema(
    {
        title: { type: String, required: true, unique: true },
        author: { type: String, required: true },
        pages: { type: Number, required: true },
        summary: { type: String, required: true },
        imageUrl: { type: String, required: false },
        note: [{ type: Number, required: false }],
        genre: { type: Schema.Types.ObjectId, ref: "genre" },
        readers: [{ type: Schema.Types.ObjectId, ref: "user" }],
        status: { type: Schema.Types.ObjectId, ref: "status" },
        comments: [{ type: Schema.Types.ObjectId, ref: "comment" }]
    },
    {
        timestamps: true
    }
)

const Book = mongoose.model('Book', BookSchema);

export default Book;