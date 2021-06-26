const { Schema, model, Types } = require('mongoose')

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
        type: {
            type: String,
            enum: [
                'BID_RECEIVED',
                'BID_ACCEPTED',
                'BID_REJECTED',
                'BID_UPDATE',
                'PRODUCT_DELETE',
            ],
            required: true,
        },
    },
    { timestamps: true }
)

module.exports = new model('Notification', notificationSchema)
