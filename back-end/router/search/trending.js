const trendingRouter = require('express').Router()
const UserInfo = require('../../model/userInfo/userInfo')

trendingRouter.get('/', async (req, res) => {
    let tag_list = []
    let ret = []
    
    const regex = /#\S+\s/g

    const userInfos = await UserInfo.find()
    //let postData = []

    userInfos.forEach(userInfo => {
        const info = userInfo.toObject()

        for (let i = 0; i < info.post_data.length; i++)
        { 
            if (info.post_data[i].content.match(regex)){
                let search_for_tag = info.post_data[i].content.match(regex)
                
                for(let i = 0; i < search_for_tag.length; i++){
                    if(tag_list.includes(search_for_tag[i]) == false){
                        ret.push({topic: search_for_tag[i]})
                        console.log('tag', search_for_tag[i]);
                    }
                    tag_list.push(search_for_tag[i])
                }
                //postData = postData.concat(data[i])
            }
        }
    })

    res.json(ret)
})
module.exports = trendingRouter
