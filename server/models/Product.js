const { Schema, model, Types } = require('mongoose')

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        image: {
            fileName: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            },
        },
        price: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        bids: [
            {
                type: Types.ObjectId,
                ref: 'Bid',
            },
        ],
        productOwner: {
            type: Types.ObjectId,
            ref: 'User',
            required: true,
        },
        following: [
            {
                type: Types.ObjectId,
                ref: 'User',
            },
        ],
        college: {
            type: Types.ObjectId,
            ref: 'College',
            required: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
)

module.exports = new model('Product', productSchema)
