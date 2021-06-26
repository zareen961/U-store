const { Schema, model, Types } = require('mongoose')

const notificationClientSchema = new Schema({
    user: {
        type: Types.ObjectId,
        ref: 'User',
        required: true,
    },
    tokens: [{ type: String }],
})

module.exports = new model('NotificationClient', notificationClientSchema)
