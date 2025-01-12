import { Schema, model, models } from "mongoose";

const GenreSchema = new Schema(
    {
        title: { type: "string", required: true, unique: true },
        books: [{ type: Schema.Types.ObjectId, ref: "Book" }],
        readers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    },
    {
        timestamps: true
    }
)

const Genre = models.Genre || model("Genre", GenreSchema);

export default Genre;