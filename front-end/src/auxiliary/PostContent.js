import './PostContent.css'
import Repost from './ToRepost'
import React, { useState, useEffect } from 'react'
import ToComment from './ToComment'

const PostContent = (props) => {

    const [state, setState] = useState({
        showRepost: false,
        showComment: false
      })

    const [like, setLike] = useState({
        liked: false
    })
 

  const _showRepost = () => {
    let cur = state.showRepost
    setState({
      showRepost: !cur
    });
  };
  const _showComment = () => {
    let cur = state.showComment
    setState({
      showComment: !cur
    });
  };
  const _setLike = () => {
    let cur = like.liked
    setLike({
      liked: !cur
    });
  };

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
            <button class = "Commentbutton" onClick = {_showComment.bind()}> Comment</button>

            <button class = "Likebutton" onClick = {_setLike.bind()}>{like.liked ? 'Liked' : 'Like'}</button>
            <button class = "Repostbutton" onClick = {_showRepost.bind()}> Repost</button>
            {state.showRepost && (
              <>
                <Repost />
              </>
            )}
            {state.showComment && (
              <>
                <ToComment />
              </>
            )}
            </div>

    </div>
  )
}



export default PostContent
