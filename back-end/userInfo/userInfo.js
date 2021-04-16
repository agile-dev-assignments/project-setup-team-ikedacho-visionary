const mongoose = require('mongoose')

//Post
const CommentedSchema = new mongoose.Schema(
    {
        id: Number,
        commented_text: String,
        commented_time: Date,
        commented_by_username: String,
        commented_by_profile_image: String,
    },
    { _id: true }
)
const Commented = mongoose.model('Commented', CommentedSchema, 'Commented')

const LikedSchema = new mongoose.Schema(
    {
        id: Number,
        liked_by_username: String,
    },
    { _id: true }
)
const Liked = mongoose.model('Liked', LikedSchema, 'Liked')

const RepostedSchema = new mongoose.Schema(
    {
        id: Number,
        reposted_by_username: String,
    },
    { _id: true }
)
const Reposted = mongoose.model('Reposted', RepostedSchema, 'Reposted')

const PostDataSchema = new mongoose.Schema(
    {
        id: Number,
        source: String,
        content: String,
        senttime: Date,
        contentimg: String,
        liked_count: Number,
        commented_count: Number,
        reposted_count: Number,
        commented: [CommentedSchema],
        liked: [LikedSchema],
        repoted: [RepostedSchema],
    },
    { _id: true }
)
const PostData = mongoose.model('PostData', PostDataSchema, 'PostData')

//Me
const MyLikeHistorySchema = new mongoose.Schema(
    {
        id: Number,
        source: String,
        userimg: String,
        UserName: String,
        content: String,
        Senttime: Date,
        contentimg: String,
    },
    { _id: true }
)
const MyLikeHistory = mongoose.model('MyLikeHistory', MyLikeHistorySchema, 'MyLikeHistory')

const MyCommentHistorySchema = new mongoose.Schema(
    {
        id: Number,
        post_created_by: String,
        post_text: String,
        post_image: String,
        commented_date: Date,
        commented_content: String,
    },
    { _id: true }
)
const MyCommentHistory = mongoose.model('MyCommentHistory', MyCommentHistorySchema, 'MyCommentHistory')

const BrowseHistorySchema = new mongoose.Schema(
    {
        id: Number,
        viewdate: Date,
        UserName: String,
        userimg: String,
        content: String,
        contentimgs: String,
    },
    { _id: true }
)
const BrowseHistory = mongoose.model('BrowseHistory', BrowseHistorySchema, 'BrowseHistory')
//Community relate to UserInfo
const OthersMentionedHistorySchema = new mongoose.Schema(
    {
        id: Number,
        mentioner_avatar: String,
        mentioner_username: String,
        mentioned_date: Date,
        post_image: String,
        post_username: String,
        post_text: Date,
    },
    { _id: true }
)
const OthersMentionedHistory = mongoose.model('OthersMentionedHistory', OthersMentionedHistorySchema, 'OthersMentionedHistory')

const OthersLikedHistorySchema = new mongoose.Schema(
    {
        id: Number,
        post_image: String,
        post_date: Date,
        liked_by_username: String,
        liked_by_profile_image: Date,
        liked_date: String,
    },
    { _id: true }
)
const OthersLikedHistory = mongoose.model('OthersLikedHistory', OthersLikedHistorySchema, 'OthersLikedHistory')

const OthersCommentedHistorySchema = new mongoose.Schema(
    {
        id: Number,
        post_text: String,
        post_image: String,
        post_date: Date,
        commented_by_username: String,
        commented_by_profile_image: String,
        commented_date: Date,
        commented_content: String,
    },
    { _id: true }
)
const OthersCommentedHistory = mongoose.model('OthersCommentedHistory', OthersCommentedHistorySchema, 'OthersCommentedHistory')

const userInfo = new mongoose.Schema(
    {
        user_name: String,
        user_photo: String,
        background_picture: String,
        post_number: Number,
        bio: String,
        follower_number: [String],
        following_number: [String],
        unconnected_social_media: Array,
        linked_social_media: Array,
        post_data: [PostDataSchema],
        my_comment_history: [MyCommentHistorySchema],
        my_browse_history: [BrowseHistorySchema],
        others_mentioned_history: [OthersMentionedHistorySchema],
        others_liked_history: [OthersLikedHistorySchema],
        others_commented_history: [OthersCommentedHistorySchema],
    },
    { _id: true }
)

module.exports = mongoose.model('userInfo', userInfo)
