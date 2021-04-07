const { Schema, model, Types } = require('mongoose')

const citySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    colleges: [
        {
            type: Types.ObjectId,
            ref: 'College',
        },
    ],
})

module.exports = new model('City', citySchema)
