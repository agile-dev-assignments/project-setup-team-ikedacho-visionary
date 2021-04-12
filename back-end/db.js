const mongoose = require('mongoose')
const User = require("./loginAuth/user");
require('dotenv').config({ silent: true })

const uri = `${process.env.DB_URL}`
mongoose.connect(
	uri
	, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
},
() => {
  console.log("Mongoose Is Connected");
}
);
