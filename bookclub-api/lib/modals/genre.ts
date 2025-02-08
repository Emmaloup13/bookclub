import mongoose, { Schema } from "mongoose";

const GenreSchema = new Schema(
    {
        title: { type: String, required: true, unique: true },
        books: [{ type: Schema.Types.ObjectId, ref: "Book" }],
        readers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    },
    {
        timestamps: true
    }
)

const Genre = mongoose.model('Genre', GenreSchema);

export default Genre;