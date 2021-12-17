const Users = require('./auth-model')

// unique username 
async function checkUsername(req, res, next) {
    const { username } = req.body
    try {
        const existingUser = await Users.findBy({username})
        if (existingUser) {
            next({status: 400, message: "username taken"})
        } else {
            next()
        }
    } catch (err) {
        next(err)
    }
}



module.exports = {
    checkUsername,
} 