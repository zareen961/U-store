require('dotenv').config()
const express = require('express')
const chalk = require('chalk')
const cors = require('cors')
const compression = require('compression')

const connectDB = require('./config/db')
const { notFoundHandler, errorHandler } = require('./middleware/error')
const adminRoutes = require('./routes/admin')
const userRoutes = require('./routes/user')
const productRoutes = require('./routes/product')
const bidRoutes = require('./routes/bid')
const collegeRoutes = require('./routes/college')
const contactRoutes = require('./routes/contact')
const notificationRoutes = require('./routes/notification')

// connecting to database
connectDB()

const app = express()

// adding morgan as middleware to log http requests in the console
if (process.env.NODE_ENV === 'development') {
    const morgan = require('morgan')
    app.use(morgan('dev'))
}

// Middleware
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(express.json({ limit: '30mb', extended: true }))
app.use(compression({ level: 9 }))
app.use(cors())

app.get('/', (_, res) => {
    res.send('<h1>U-store Server Running....</h1>')
})

// Routes
app.use('/api/admin', adminRoutes)
app.use('/api/user', userRoutes)
app.use('/api/college', collegeRoutes)
app.use('/api/product', productRoutes)
app.use('/api/bid', bidRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/notification', notificationRoutes)

// Error Handler middleware
app.use(notFoundHandler)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

// starting the server
app.listen(PORT, () => {
    console.log(chalk.blue(`Server running on port ${PORT}`))
})
