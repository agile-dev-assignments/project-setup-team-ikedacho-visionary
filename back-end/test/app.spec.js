const request = require('supertest')
const app = require('../app') // the express server
const expect = require('chai').expect

// Test for Follower and Following
describe('Follower and Following List in front-end/src/me', () => {
    describe('Follower', () => {
        it('Should return [img, UserName, bio, action]', () => {
            request(app)
                .get('/api_followers', {
                    params: {},
                })
                .then((response) => {
                    // automatic statusCode must be 200 <-- success
                    expect(response.statusCode).to.equal(200)
                    // parse returned JSON string
                    const parsed = JSON.parse(response.text)
                    // initialize property array
                    const expectedProperty = ['img', 'UserName', 'bio', 'action']
                    // assertions
                    expect(parsed).to.be.a('Array')
                    parsed.forEach((object) => {
                        expectedProperty.forEach((element) => {
                            expect(object).to.have.property(element)
                        })
                    })
                })
        })
    })

    describe('Following', () => {
        it('Should return [img, UserName, bio, action]', () => {
            request(app)
                .get('/api_followings', {
                    params: {},
                })
                .then((response) => {
                    // automatic statusCode must be 200 <-- success
                    expect(response.statusCode).to.equal(200)
                    // parse returned JSON string
                    const parsed = JSON.parse(response.text)
                    // initialize property array
                    const expectedProperty = ['img', 'UserName', 'bio', 'action']
                    // assertions
                    expect(parsed).to.be.a('Array')
                    parsed.forEach((object) => {
                        expectedProperty.forEach((element) => {
                            expect(object).to.have.property(element)
                        })
                    })
                })
        })
    })
})

// Test for Login and Signup
describe('login and signup', () => {
    describe('login', () => {
        it('loggedin successfully!', () => {
            request(app)
                .post('/login', {
                    params: {
                        username: 'xindama',
                        password: 'xxxmmm',
                        withCredentials: true,
                    },
                })
                .then((response) => {
                    // automatic statusCode must be 200 <-- success
                    expect(response.statusCode).to.equal(200)
                    // parse returned JSON string
                    const parsed = JSON.parse(response.text)
                    // assertions
                    expect(parsed.status).to.be('created')
                })
        })
    })

    describe('signup', () => {
        const signupdata = {
            username: 'xindama',
            email: 'xindama@gmail.com',
            password: 'xxxmmm',
            confirmpassword: 'xxxmmm',
            withCredentials: true,
        }
        it('loggedin successfully!', function () {
            request(app)
                .post('/newuser', {
                    params: signupdata,
                })
                .then((response) => {
                    // automatic statusCode must be 200 <-- success
                    expect(response.statusCode).to.equal(200)
                    // parse returned JSON string
                    const parsed = JSON.parse(response.text)
                    // assertions
                    expect(parsed.status).to.be('created')
                })
        })
    })
})

// Test for home page
describe('accesshomepage', () => {
    describe('getdatahomepage', () => {
        it('getalldata', () => {
            request(app)
                .get('/api_whatsnew')
                .then((response) => {
                    // automatic statusCode must be 200 <-- success
                    expect(response.statusCode).to.equal(200)
                })
        })
    })
})

// Test for post detail page
describe('accesspostdetialpage', () => {
    describe('postpostdetail', () => {
        it('postbrowseddata', () => {
            request(app)
                .post('/browsed')
                .then((response) => {
                    // automatic statusCode must be 200 <-- success
                    expect(response.statusCode).to.equal(200)
                    // parse returned JSON string
                    const parsed = JSON.parse(response.text)
                    // assertions
                    expect(parsed.status).to.be('created')
                })
        })
    })
})

// Test for Friend Profile
describe('Friend Profile in front-end/src/me', () => {
    describe('Friend Profile', () => {
        it('Should return [friend_info, post_data, linked_social_media]', () => {
            request(app)
                .get('/api_friend_profile', {
                    params: {
                        UserName: 'Bob',
                        userimg: 'https://robohash.org/eteosoccaecati.png?size=50x50\u0026set=set1',
                    },
                })
                .then((response) => {
                    // automatic statusCode must be 200 <-- success
                    expect(response.statusCode).to.equal(200)
                    // parse returned JSON string
                    const parsed = JSON.parse(response.text)
                    // initialize property array
                    const expectedProperty = ['friend_info', 'post_data', 'linked_social_media']
                    // assertions
                    expect(parsed).to.be.a('Object')
                    expectedProperty.forEach((element) => {
                        expect(parsed).to.have.property(element)
                    })
                })
        })
    })
})

// Test for Friend Suggestion
describe('Friend Suggestion in front-end/src/me', () => {
    describe('Friend Suggestion Search with empty string', () => {
        it('Should return [img, UserName, bio, action]', () => {
            request(app)
                .get('/api_friend_suggestion', {
                    params: {
                        searched_name: '',
                    },
                })
                .then((response) => {
                    // automatic statusCode must be 200 <-- success
                    expect(response.statusCode).to.equal(200)
                    // parse returned JSON string
                    const parsed = JSON.parse(response.text)
                    // initialize property array
                    const expectedProperty = ['img', 'UserName', 'bio', 'action']
                    // assertions
                    expect(parsed).to.be.a('Array')
                    parsed.forEach((object) => {
                        expectedProperty.forEach((element) => {
                            expect(object).to.have.property(element)
                        })
                    })
                })
        })
    })

    describe('Friend Suggestion Search with non-empty string', () => {
        it('Should return [img, UserName, bio, action]', () => {
            request(app)
                .get('/api_friend_suggestion', {
                    params: {
                        searched_name: 'Bob',
                    },
                })
                .then((response) => {
                    // automatic statusCode must be 200 <-- success
                    expect(response.statusCode).to.equal(200)
                    // parse returned JSON string
                    const parsed = JSON.parse(response.text)
                    // initialize property array
                    const expectedProperty = ['img', 'UserName', 'bio', 'action']
                    // assertions
                    expect(parsed).to.be.a('Array')
                    parsed.forEach((object) => {
                        expectedProperty.forEach((element) => {
                            expect(object).to.have.property(element)
                        })
                    })
                })
        })
    })
})

// Test for Being-Liked
describe('Being-Liked in front-end/src/community', () => {
    describe('Being-Liked', () => {
        it('Should return [id, post_text, post_image, post_date, liked_by_username, liked_by_profile_image, liked_date]', () => {
            request(app)
                .get('/api_being_liked', {
                    params: {},
                })
                .then((response) => {
                    // automatic statusCode must be 200 <-- success
                    expect(response.statusCode).to.equal(200)
                    // parse returned JSON string
                    const parsed = JSON.parse(response.text)
                    // initialize property array
                    const expectedProperty = ['id', 'post_text', 'post_image', 'post_date', 'liked_by_username', 'liked_by_profile_image', 'liked_date']
                    // assertions
                    expect(parsed).to.be.a('Array')
                    parsed.forEach((object) => {
                        expectedProperty.forEach((element) => {
                            expect(object).to.have.property(element)
                        })
                    })
                })
        })
    })
})

// Test for Being-Mentioned
describe('Being-Mentioned in front-end/src/community', () => {
    describe('Being-Mentioned', () => {
        it('Should return [mentioner_avatar, mentioner_username, mentioned_date, post_image, post_username, post_text]', () => {
            request(app)
                .get('/api_being_mentioned', {
                    params: {},
                })
                .then((response) => {
                    // automatic statusCode must be 200 <-- success
                    expect(response.statusCode).to.equal(200)
                    // parse returned JSON string
                    const parsed = JSON.parse(response.text)
                    // initialize property array
                    const expectedProperty = ['mentioner_avatar', 'mentioner_username', 'mentioned_date', 'post_image', 'post_username', 'post_text']
                    // assertions
                    expect(parsed).to.be.a('Array')
                    parsed.forEach((object) => {
                        expectedProperty.forEach((element) => {
                            expect(object).to.have.property(element)
                        })
                    })
                })
        })
    })
})

// Test for Liked History
describe('Liked History in front-end/src/me', () => {
    describe('Liked History', () => {
        it('Should return [source, userimg, UserName, content, Senttime, contentimg]', () => {
            request(app)
                .get('/api_liked_history', {
                    params: {},
                })
                .then((response) => {
                    // automatic statusCode must be 200 <-- success
                    expect(response.statusCode).to.equal(200)
                    // parse returned JSON string
                    const parsed = JSON.parse(response.text)
                    // initialize property array
                    const expectedProperty = ['source', 'userimg', 'UserName', 'content', 'Senttime', 'contentimg']
                    // assertions
                    expect(parsed).to.be.a('Array')
                    parsed.forEach((object) => {
                        expectedProperty.forEach((element) => {
                            expect(object).to.have.property(element)
                        })
                    })
                })
        })
    })
})

// Test for Chat
describe('Chat in front-end/src/me', () => {
    describe('Chat List', () => {
        it('Should return [roomID, username, user_photo, newest_message, newest_message_date]', () => {
            request(app)
                .get('/api_message', {
                    params: {},
                })
                .then((response) => {
                    // automatic statusCode must be 200 <-- success
                    expect(response.statusCode).to.equal(200)
                    // parse returned JSON string
                    const parsed = JSON.parse(response.text)
                    // initialize property array
                    const expectedProperty = ['roomID', 'username', 'user_photo', 'newest_message', 'newest_message_date']
                    // assertions
                    expect(parsed).to.be.a('Array')
                    parsed.forEach((object) => {
                        expectedProperty.forEach((element) => {
                            expect(object).to.have.property(element)
                        })
                    })
                })
        })
    })

    describe('Chat Message', () => {
        it('Should return [userimg, username, time, fromSender, content]', () => {
            request(app)
                .get('/api_chat_messages', {
                    params: {
                        roomID: 1,
                    },
                })
                .then((response) => {
                    // automatic statusCode must be 200 <-- success
                    expect(response.statusCode).to.equal(200)
                    // parse returned JSON string
                    const parsed = JSON.parse(response.text)
                    // initialize property array
                    const expectedProperty = ['userimg', 'username', 'time', 'fromSender', 'content']
                    // assertions
                    expect(parsed).to.be.a('Array')
                    parsed.forEach((object) => {
                        expectedProperty.forEach((element) => {
                            expect(object).to.have.property(element)
                        })
                    })
                })
        })
    })

    describe('Create New Chat -> Friend List', () => {
        it('Should return [username, userimg]', async () => {
            request(app)
                .get('/api_create_new_chat_list', {
                    params: {
                        roomID: 1,
                    },
                })
                .then((response) => {
                    // automatic statusCode must be 200 <-- success
                    expect(response.statusCode).to.equal(200)
                    // parse returned JSON string
                    const parsed = JSON.parse(response.text)
                    // initialize property array
                    const expectedProperty = ['username', 'userimg']
                    // assertions
                    expect(parsed).to.be.a('Array')
                    parsed.forEach((object) => {
                        expectedProperty.forEach((element) => {
                            expect(object).to.have.property(element)
                        })
                    })
                })
        })
    })

    /*
    // async function calls keeps messing with mocha
    // current version: mocha hangs after all have been finished unless explicitly call with --exit
    describe('Chat New Chat -> return roomID', () => {
        it('Should return [roomID]', (done) => {
            request(app)
            .get('/api_create_new_chat_roomID', {
                params: {
                    participantsList: {
                        user: [
                            {
                                username: 'asd', 
                                userimg: ''
                            }, 
                            {
                                username: 'zxc', 
                                userimg: ''
                            }
                        ]
                    }
                }
            })
            .then((response) => {
                // automatic statusCode must be 200 <-- success
                expect(response.statusCode).to.equal(200)
                // parse returned JSON string
                const parsed = JSON.parse(response.text)
                // assertions
                expect(parsed).to.be.a('String')
            })
            done()
        })
    })
    */
})

describe('/get_my_profile api', () => {
    describe('res.status.', () => {
        it('res.status should be 200.', () => {
            return request(app)
                .get('/get_my_profile')
                .then((response) => {
                    expect(response.status).to.equal(200)
                })
        })
    })

    describe('check res.body', () => {
        it('res.body', () => {
            request(app)
                .get('/get_my_profile')
                .end((err, res) => {
                    expect(res.body).that.includes.all.keys(['user_info', 'post_data', 'linked_social_media'])
                })
        })
    })
})

describe('/get_me api', () => {
    describe('200', () => {
        it('res.status should be 200.', () => {
            return request(app)
                .get('/get_me')
                .then((response) => {
                    expect(response.status).to.equal(200)
                })
        })
    })
    describe('check res.body', () => {
        it('res.body', () => {
            request(app)
                .get('/get_me')
                .end((err, res) => {
                    expect(res.body).that.includes.all.keys(['user_info', 'linked_social_media', 'unconnected_social_media'])
                })
        })
    })
})

describe('/api_my_comment_history api', () => {
    describe('res.status', () => {
        it('res.status should be 200.', () => {
            return request(app)
                .get('/api_my_comment_history')
                .then((response) => {
                    expect(response.status).to.equal(200)
                })
        })
    })
    describe('check res.body', () => {
        it('res.body', () => {
            request(app)
                .get('/api_my_comment_history')
                .end((err, res) => {
                    expect(res.body)
                        .to.be.an.instanceof(Array)
                        .and.to.have.property(0)
                        .that.includes.all.keys(['id', 'post_created_by', 'post_text', 'post_image', 'commented_date', 'commented_content'])
                })
        })
    })
})

describe(' /api_commented_history api', () => {
    describe(' res.status', () => {
        it('res.status should be 200.', () => {
            return request(app)
                .get('/api_commented_history')
                .then((response) => {
                    expect(response.status).to.equal(200)
                })
        })
    })
    describe('check res.body', () => {
        it('res.body', () => {
            request(app)
                .get('/api_commented_history')
                .end((err, res) => {
                    expect(res.body)
                        .to.be.an.instanceof(Array)
                        .and.to.have.property(0)
                        .that.includes.all.keys(['id', 'post_text', 'post_image', 'post_date', 'commented_by_username', 'commented_by_profile_image', 'commented_date', 'commented_content'])
                })
        })
    })
})

//Test for Trending
describe('Trending: front-end/src/Search', () => {
    describe('Trending', () => {
        it('Should return .status == 200; res: an array of hot topics', () => {
            request(app)
                .get('/api_trending')
                .then((response) => {
                    expect(response.statusCode).to.equal(200)
                    const parsed_in = JSON.parse(response.text)
                    expect(parsed_in).to.be.an.instanceOf(Array).and.to.have.property(0).and.to.include.all.keys(['Topic'])
                })
        })
    })
})

//Test for Search Recommendations
describe('Search Recommendations: front-end/src/SearchRecommeded', () => {
    describe('Search Recommendations', () => {
        it('Should return .status == 200; res: an array of recommended topics', () => {
            request(app)
                .get('/api_search_recommended')
                .then((response) => {
                    expect(response.statusCode).to.equal(200)
                    const parsed_in = JSON.parse(response.text)
                    expect(parsed_in).to.be.an.instanceOf(Array).and.to.have.property(0).and.to.include.all.keys(['Topic'])
                })
        })
    })
})

//Test for Search Results
describe('Search Results: front-end/src/SearchResult', () => {
    describe('Search Results', () => {
        it('Should return .status == 200; res: [source, userimg, id, post_text, post_image, post_date]', () => {
            request(app)
                .get('/api_search_result')
                .then((response) => {
                    expect(response.statusCode).to.equal(200)
                    const parsed_in = JSON.parse(response.text)
                    expect(parsed_in).to.be.an.instanceOf(Array).and.to.have.property(0).and.to.include.all.keys(['source', 'userimg', 'UserName', 'Senttime', 'contentimg', 'content'])
                })
        })
    })
})
