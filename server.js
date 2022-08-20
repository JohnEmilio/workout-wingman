const express = require("express");
const app = express();
const cors = require('cors')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')
const connectDB = require("./config/db");
const homeRoutes = require('./routes/home')
const loginRoutes = require('./routes/login')
const userRoutes = require('./routes/user')
const path = require('path')

// Load Config
dotenv.config({ path: './config/config.env' })

connectDB()


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/', homeRoutes)
app.use('/login', loginRoutes)
app.use('/user', userRoutes)

// if (process.env.NODE_ENV === 'development') {
//     app.use(express.static(__dirname, 'client', 'build'))

//     app.get('*', (req, res) => {
//         res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
//     })

// }
// console.log(process.env.NODE_ENV)

app.use(express.static(path.join(__dirname, './client/build')))

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'client', 'build'))
// })

app.listen(process.env.PORT, () => { console.log(`Listenting on ${process.env.PORT}`) })