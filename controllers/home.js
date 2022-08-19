module.exports = {
    getIndex: (req, res) => {
        res.render('index.html')
    },
    logout: async (req, res) => {
        res.send({ msg: false })
    }
}