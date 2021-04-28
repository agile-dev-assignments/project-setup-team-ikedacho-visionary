const searchRecommendRouter = require('express').Router()
const axios = require('axios') // middleware for making requests to APIs
searchRecommendRouter.get('/', async (req, res) => {
    let ret = []

    await axios
        .get(`${process.env.API_SEARCH_RECOMMENDED}?key=${process.env.API_SEARCH_RECOMMENDED_KEY}`)
        .then((apiResponse) => (ret = apiResponse.data))
        .catch((err) => {
            //console.log(err)
            const backupData = [
                { topic: 'Recommended topic #1' },
                { topic: 'Recommended topic #2' },
                { topic: 'Recommended topic #3' },
                { topic: 'Recommended topic #4' },
                { topic: 'Recommended topic #5' },
            ]
            ret = backupData
        })

    res.json(ret)
})
module.exports = searchRecommendRouter