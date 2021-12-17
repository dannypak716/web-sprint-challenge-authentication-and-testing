const Users = require('./auth-model')

// check for unique username 
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

// check for req.body 
function checkBody(req, res, next) {
    const { username, password } = req.body
    if (!username || username === '' || !password || password === '') {
        next({status: 404, message: "username and password required"})
    } else {
        next()
    }
}


module.exports = {
    checkUsername,
    checkBody
} 