const User = require('../models/User')
const Exercise = require('../models/Exercise')
const bcrypt = require('bcrypt')

module.exports = {
    getExercises: async (req, res) => {
        try {
            const exs = await Exercise.find({ userId: req.body.userId })
            const data = await JSON.stringify(exs)
            res.send(data)
        } catch (err) {
            console.error(err)
            // res.redirect('error/404')
        }
    },
    newWorkout: async (req, res) => {
        try {
            await Exercise.create(req.body)
            res.send({ msg: `Workout Logged for ${req.body.date}` })
        } catch (err) {
            console.error(err)
        }
    },
    createWorkout: async (req, res) => {
        try {
            res.send('Craft your workout!')
        } catch (err) {
            console.error(err)
        }
    },
    getUserData: async (req, res) => { // Get the user data from the database to show name on profile page
        try {
            const user = await User.find({ userId: req.body.userId })
            const data = await JSON.stringify(user)
            res.send(data)
        } catch (err) {
            console.error(err)
        }
    },
    deleteWorkout: async (req, res) => { // Delete one workout by searching the database by id
        try {
            await Exercise.deleteOne({ _id: req.body.id })
            res.send({ msg: "Workout Deleted" })
        } catch (err) {
            console.error(err)
        }
    },
    findWorkout: async (req, res) => {
        try {
            const data = await Exercise.findById({ _id: req.body.id })
            res.send(data)
        } catch (err) {
            console.error(err)
        }
    },
    editWorkout: async (req, res) => {
        console.log(req.body)
        try {
            await Exercise.updateOne({ _id: req.body._id }, {
                $set: {
                    workout: req.body.workout
                }
            })
            res.send(JSON.stringify({ msg: 'Updated Workout' }))
        } catch (err) {
            console.error(err)
        }
    }
}

// app.post('/user/:id', async (req, res) => {
//     try {
//         const user = {
//             email: req.body.email,
//             password: req.body.password
//         }
//         const dbUser = await User.findOne({ email: user.email })
//         const comparePass = await bcrypt.compare(user.password, dbUser.password)
//         if (comparePass) {
//             res.send(JSON.stringify('Passwords correct'))
//         }
//         else {
//             res.send(JSON.stringify("No such user found"))

//         }
//     } catch (err) {
//         console.error(err)
//     }
// })

// app.post('/registeruser', async (req, res) => {
//     try {
//         const user = {
//             email: req.body.email,
//             firstName: req.body.firstName,
//             lastName: req.body.lastName,
//             password: await bcrypt.hash(req.body.password, 10),
//             userId: req.body.userId
//         }
//         await User.create(user)
//         res.send(JSON.stringify(user))
//     } catch (err) {
//         console.error(err)
//     }
// })