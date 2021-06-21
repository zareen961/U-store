const { Schema, model, Types } = require('mongoose')
const fuzzySearch = require('mongoose-fuzzy-searching')

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

productSchema.plugin(fuzzySearch, { fields: ['name', 'description'] })

module.exports = new model('Product', productSchema)
