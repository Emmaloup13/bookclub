import mongoose, { Schema } from "mongoose";


const UserSchema = new Schema(
    {
        email: { type: String, required: true, unique: true },
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        imageUrl: { type: String, required: false },
        genres: [{ type: Schema.Types.ObjectId, ref: "genre" }],
        books: [{ type: Schema.Types.ObjectId, ref: "book" }],
        comments: [{ type: Schema.Types.ObjectId, ref: "comment" }]
    },
    {
        timestamps: true
    }
)

const User = mongoose.model('User', UserSchema);

export default User;
