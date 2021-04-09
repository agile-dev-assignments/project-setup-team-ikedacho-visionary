const mongoose = require('mongoose')
require('dotenv').config({ silent: true })
const uri = process.env.DB_URL
mongoose.connect(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
})
const MyCommentHistorySchema = new mongoose.Schema(
	{
		id: Number,
		post_created_by: String,
		post_text: String,
		post_image: String,
		commented_date: String,
		commented_content: String,
	},
	{ _id: true }
)
const MyCommentHistory = mongoose.model(
	'MyCommentHistory',
	MyCommentHistorySchema,
	'MyCommentHistory'
)

const PostDataSchema = new mongoose.Schema(
	{
		id: Number,
		source: String,
		content: String,
		senttime: Number,
		contentimg: String,
	},
	{ _id: true }
)
const PostData = mongoose.model('PostData', PostDataSchema, 'PostData')

const UserInfoSchema = new mongoose.Schema(
	{
		user_name: String,
		user_photo: String,
		background_picture: String,
		post_number: Number,
		bio: String,
		follower_number: Number,
		following_number: Number,
		unconnected_social_media: Array,
		linked_social_media: Array,
		post_data: [PostDataSchema],
	},
	{ _id: true }
)
const UserInfo = mongoose.model('UserInfo', UserInfoSchema, 'UserInfo')
