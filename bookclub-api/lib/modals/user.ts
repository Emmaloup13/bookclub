import { Schema, model, models } from "mongoose";


const UserSchema = new Schema(
    {
        email: { type: "string", required: true, unique: true },
        username: { type: "string", required: true, unique: true },
        password: { type: "string", required: true },
        imageUrl: { type: "string", required: false },
        genres: [{ type: Schema.Types.ObjectId, ref: "Genre" }],
        books: [{ type: Schema.Types.ObjectId, ref: "Book" }],
        comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }]
    },
    {
        timestamps: true
    }
)

const User = models.User || model("User", UserSchema);

export default User;