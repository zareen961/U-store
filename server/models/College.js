const { Schema, model, Types } = require('mongoose')

const collegeSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
})

module.exports = new model('College', collegeSchema)
