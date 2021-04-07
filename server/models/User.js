const { Schema, model, Types } = require('mongoose')

const notificationSchema = new Schema({
    type: {
        type: String,
        enum: [
            'BID_RECEIVED',
            'BID_ACCEPTED',
            'BID_REJECTED',
            'BIDDEN_PRODUCT_DELETED',
            'RIVAL_BID',
        ],
        required: true,
    },
    user: {
        type: Types.ObjectID,
        ref: 'User',
        required: true,
    },
    product: {
        type: Types.ObjectID,
        ref: 'Product',
        required: true,
    },
})

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
        },
        avatar: {
            type: Number,
            default: 1,
        },
        primaryPhone: {
            type: Number,
            required: true,
        },
        secondaryPhone: {
            type: Number,
        },
        collegeState: {
            type: Types.ObjectId,
            ref: 'State',
            required: true,
        },
        collegeCity: {
            type: Types.ObjectId,
            ref: 'City',
            required: true,
        },
        college: {
            type: Types.ObjectId,
            ref: 'College',
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        bids: [
            {
                type: Types.ObjectId,
                ref: 'Bid',
            },
        ],
        products: [
            {
                type: Types.ObjectId,
                ref: 'Product',
            },
        ],
        notifications: [notificationSchema],
    },
    {
        timestamps: true,
    }
)

module.exports = new model('User', userSchema)
