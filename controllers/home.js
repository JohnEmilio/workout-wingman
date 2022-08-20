
module.exports = {
    getIndex: (req, res) => {
        res.send('Hello from the backend')
    },
    logout: async (req, res) => {
        res.send({ msg: false })
    }
}