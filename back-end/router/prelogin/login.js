const loginRouter = require('express').Router()
const passport = require('passport')
const passportLocal = require('passport-local').Strategy

loginRouter.post('/', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) throw err
        if (!user) res.send('No User Exists')
        else {
            req.logIn(user, (err) => {
                if (err) throw err
                res.send('Successfully Authenticated')
                console.log(req.user)
            })
        }
    })(req, res, next)
})

module.exports = loginRouter
