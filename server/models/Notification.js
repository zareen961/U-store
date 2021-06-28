const { Schema, model, Types } = require('mongoose')
const {
    BID_ACCEPTED,
    BID_PLACED,
    BID_REJECTED,
    BID_UPDATED,
    PRODUCT_DELETED,
} = require('../utils/constants')

const notificationSchema = new Schema(
    {
        product: {
            type: Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        creator: {
            type: Types.ObjectId,
            ref: 'User',
            required: true,
        },
        spotlightUser: {
            type: String,
            required: false,
            default: '',
        },
        type: {
            type: String,
            enum: [BID_PLACED, BID_ACCEPTED, BID_REJECTED, BID_UPDATED, PRODUCT_DELETED],
            required: true,
        },
    },
    { timestamps: true }
)

module.exports = new model('Notification', notificationSchema)
