const { Schema, model, Types } = require('mongoose')
const bcrypt = require('bcryptjs')

const userNotificationSchema = new Schema({
    notification: {
        type: Types.ObjectId,
        ref: 'Notification',
        required: 'true',
    },
    isRead: {
        type: Boolean,
        default: false,
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
            default: 0,
        },
        primaryPhone: {
            type: String,
            required: true,
        },
        secondaryPhone: {
            type: String,
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
        following: [
            {
                type: Types.ObjectId,
                ref: 'Product',
            },
        ],
        notifications: [userNotificationSchema],
    },
    {
        timestamps: true,
    }
)

// to match the provided password with the password saved in the database
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

// to hash the password before saving to the database
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }

    const salt = await bcrypt.genSalt(13)
    this.password = await bcrypt.hash(this.password, salt)
})

module.exports = new model('User', userSchema)
