const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
        console.log(`MongoDB connection ${conn.connection.host}`)
    } catch (err) {
        console.err(err)
        process.exit(1)
    }
}

module.exports = connectDB