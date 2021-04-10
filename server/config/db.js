const chalk = require("chalk")
const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        })
        console.log(chalk.bgGreen.black(`MongoDB Connected: ${conn.connection.host}`))
    } catch (err) {
        console.log(chalk.red(`Error: ${err.message}`))
        process.exit(1)
    }
}

module.exports = connectDB
