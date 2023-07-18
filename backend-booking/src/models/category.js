import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
    {
        // _id: {
        //     type: String || Number
        // },
        name: {
            type: String,
        },
        rooms: [{ type: mongoose.Types.ObjectId, ref: "Room" }],
    },
    { timestamps: true, versionKey: false }
);

export default mongoose.model("Category", categorySchema);
