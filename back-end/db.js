const mongoose = require('mongoose')
require('dotenv').config({ silent: true })
const MongoClient = require('mongodb').MongoClient
const uri = `${process.env.DB_URL}`
mongoose.connect(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
})
