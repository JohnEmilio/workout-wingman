const User = require('../models/User')
const bcrypt = require('bcrypt')

module.exports = {
    createUser: async (req, res) => {
        try {
            const newUser = {
                email: req.body.email,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                password: await bcrypt.hash(req.body.password, 10),
                userId: req.body.userId
            }
            const prevUser = await User.findOne({ email: newUser.email })
            if (prevUser != null) {
                res.send({ msg: "Email has already been registered. Please use a new email" })
            }
            else {
                await User.create(newUser)
                res.send({ msg: "New User created. Please login to continue." })
            }
        } catch (err) {
            console.error(err)
        }
    },
    userLogin: async (req, res) => {
        try {
            const dbUser = await User.findOne({ email: req.body.email })
            const comparePass = await bcrypt.compare(req.body.password, dbUser.password)
            
            if (comparePass) {
                res.send({ msg: true, userId: dbUser.userId })
            }
            else {
                res.send({ msg: false, text: "Incorrect email or password" })
            }
        } catch (err) {
            console.error(err)
        }
    }
}