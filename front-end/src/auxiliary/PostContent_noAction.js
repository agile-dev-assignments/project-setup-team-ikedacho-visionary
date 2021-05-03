import './PostContent_noAction.css'
import PostContent_img_na from '../auxiliary/PostContent_img_na'
import React from 'react'
import { createBrowserHistory } from 'history'
import axios from 'axios'


const PostContent_noAction = (props) => {
    /* 
    // currently no image in post
    let content_imgs = []
    content_imgs = props.contentimg
    */

    const history = createBrowserHistory({ forceRefresh: true })

    const _Friend_Profile_with_param = (event) => {
        event.preventDefault()
        const params = {
            UserName: props.UserName,
            userimg: props.userimg,
        }

        console.log(params)

        history.push({
            pathname: (params.UserName === props.self_username) ? '/my_profile' : '/friend_profile' ,
            state: params,
        })
    }

    return (
        <div class='PostContent_noAction'>
            <strong class='PlatformSource_noAction'>{props.source}</strong>
            <div class='block_noAction'>
                <img class='userimg' src={props.userimg} onClick={_Friend_Profile_with_param.bind()}/>
                <div class='Text'>
                    <strong class='username' onClick={_Friend_Profile_with_param.bind()}>{props.UserName}</strong>
                    <p>{new Date(props.Senttime).toLocaleString()}</p>
                </div>
            </div>

            <p class='postcontent_noAction'>{props.content}</p>

            <img className='contentimg' src={props.contentimg} />
            {/* <div class="imageimport" >
                {content_imgs.map((img)=>(
                <PostContent_img_na 
  
                key ={img.id} 
                contentimg={img} />
                ))}
                </div> */}
        </div>
    )
}

export default PostContent_noAction
