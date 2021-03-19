import React from 'react'
import './PostContent.css'

const PostContent = (props) => {

  return (
    <div class="PostContent">
        <strong class="PlatformSource">{props.source}</strong>
        <div class = "block">
    <img class="userimg" src={props.userimg} />
        <div class="Text">
        <strong class = "username">{props.UserName}</strong>
        <p class = "time">{props.Senttime}</p>
    </div>
</div>

        <p class = "postcontent">{props.content}</p>
        <img class="contentimg" src={props.contentimg} />
        <div class = "footer">
            <button class = "Commentbutton"> Comment</button>
            <button class = "Likebutton"> Like</button>
            <button class = "Repostbutton"> Repost</button>
            </div>

    </div>
  )
}



export default PostContent
