const mongoose = require('mongoose')
const User = require('./loginAuth/user')
require('dotenv').config({ silent: true })

const uri = `${process.env.DB_URL}`
async function asyncCall() {
    try {
        console.log('Connecting to database...')
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        })
        console.log('successfully connected to db')
    } catch (e) {
        console.error(e)
        console.log('error. cannot connect to db')
    }
}
asyncCall()

module.exports = mongoose