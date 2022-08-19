const mongoose = require('mongoose')

const ExerciseSchema = new mongoose.Schema({
    date: {
        type: String
    },
    userId: {
        type: String,
        required: true
    },
    workout: {
        type: [],
        required: true
    }
})

module.exports = mongoose.model('Exercise', ExerciseSchema)