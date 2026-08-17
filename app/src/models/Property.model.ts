import mongoose, { Schema } from "mongoose";

const PropertySchema = new Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String },
    price: { type: Number, required: true },
    area: { type: Number, required: true },
    address: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: {
        type: String,
        enum: ["DRAFT", "PUBLISHED", "SOLD", "RENTED", "ARCHIVED"],
        default: "DRAFT"
    }
}, { timestamps: true });

export const PropertyModel = mongoose.model("Property", PropertySchema);
