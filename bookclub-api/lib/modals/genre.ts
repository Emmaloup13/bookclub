import mongoose, { Schema } from "mongoose";
import User from './user';
import Book from "./book";

const GenreSchema: Schema = new Schema(
    {
        title: { type: String, required: true, unique: true },
        books: [{ type: Schema.Types.ObjectId, ref: Book }],
        readers: [{ type: Schema.Types.ObjectId, ref: User }],
    },
    {
        timestamps: true
    }
)

const Genre = mongoose.model('Genre', GenreSchema);

export default Genre;