const { Schema, model, Types } = require('mongoose')

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
            enum: ['ACCEPTED', 'REJECTED', 'PENDING'],
            default: 'PENDING',
        },
        bidOwner: {
            type: Types.ObjectId,
            ref: 'User',
        },
        productOwner: {
            type: Types.ObjectId,
            ref: 'User',
        },
    },
    { timestamps: true }
)

module.exports = new model('Bid', bidSchema)
