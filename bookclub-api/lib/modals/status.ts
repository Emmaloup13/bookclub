import { Schema, model, models } from "mongoose";


const StatusSchema = new Schema(
    {
        title: { type: String, required: true, unique: true },
        books: [{ type: Schema.Types.ObjectId, ref: "Book" }]
    },
    {
        timestamps: true
    }
)

const Status = models.Status || model("Status", StatusSchema);

export default Status;