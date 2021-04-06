const mongoose = require('mongoose')
require('dotenv').config({ silent: true })
const MongoClient = require('mongodb').MongoClient
const uri = `${process.env.DB_URL}`
const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
client.connect((err) => {
	if (err) {
		console.log(err)
	} else {
		console.log('success connect to mongodb')
	}
})