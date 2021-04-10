const { Schema, model, Types } = require("mongoose")

const bidSchema = new Schema(
    {
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        status: {
            type: String,
            required: true,
            enum: ["ACCEPTED", "REJECTED", "PENDING"],
            default: "PENDING",
        },
        bidOwner: {
            type: Types.ObjectId,
            ref: "User",
            required: true,
        },
        product: {
            type: Types.ObjectId,
            ref: "Product",
            required: true,
        },
    },
    { timestamps: true }
)

module.exports = new model("Bid", bidSchema)
