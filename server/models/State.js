const { Schema, model, Types } = require('mongoose')

const stateSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    cities: [
        {
            type: Types.ObjectId,
            ref: 'City',
        },
    ],
})

module.exports = new model('State', stateSchema)
