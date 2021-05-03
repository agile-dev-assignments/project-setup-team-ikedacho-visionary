const logoutRouter = require('express').Router()
const passport = require('passport')
const passportLocal = require('passport-local').Strategy

logoutRouter.get('/', async (req, res) => {
    req.logout();
    res.send('loggedout')
  });

  module.exports = logoutRouter