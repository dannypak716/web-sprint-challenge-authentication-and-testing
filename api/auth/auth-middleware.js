const Users = require('./auth-model')

// check for unique username 
async function checkUsername(req, res, next) {
    const { username } = req.body
    try {
        const existingUser = await Users.findBy({username})
        if (existingUser) {
            next({status: 400, message: "Username taken!"})
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
        next({status: 404, message: "Username and Password required!"})
    } else {
        next()
    }
}

// check user & authenticate
async function checkValid(req, res, next) {
    const { username } = req.body;
    try {

        const existingUser = await Users.findBy({username})
        if (!existingUser) {
            next({status: 400, message: "Invalid credentials!"})
        } else {
            req.user = existingUser
            next()
        }
    } catch (err) {
        next(err)
    }
}

module.exports = {
    checkUsername,
    checkBody,
    checkValid
} 

//created tokenbuilder connected to secrets file to fallback onto if environment variables fail.  login works//