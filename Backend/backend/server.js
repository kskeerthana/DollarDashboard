const dotenv = require('dotenv').config()
const colors = require('colors')
const cors = require("cors");
const express = require('express')
const {errorHandler} = require('./middleware/errorMiddleware')

const connectDB = require('./config/db')
const port = process.env.PORT

connectDB()
const app = express()
app.use(express.json())
app.use(cors());
app.use(express.urlencoded({extended: false}))

app.use("/api/transaction",transactionRouter, require("./routes/transactionRouter"));
app.use('/api/contribution', require('./routes/contributionRoutes'))
app.use('/api/saving', require('./routes/savingRoutes'))
app.use('/api/user', require('./routes/userRoutes'))

app.use(errorHandler)
app.listen(port,() => console.log(`server started on port ${port}`))