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
    <div className="PostContent">
        <strong className="PlatformSource">{props.source}</strong>
        <div className = "block">
    <img className="userimg" src={props.userimg} />
        <div className="Text">
        <strong className = "username">{props.UserName}</strong>
        <p className = "time">{props.Senttime}</p>
    </div>
</div>

        <p className = "postcontent">{props.content}</p>
        <img className="contentimg" src={props.contentimg} />
        <div className = "footer">
            <button className = "Commentbutton" onClick = {_showComment.bind()}> Comment</button>
            {state.showComment && (
              <>
                <ToComment />
              </>
            )}
            <button className = "Likebutton" onClick = {_setLike.bind()}>{like.liked ? 'Liked' : 'Like'}</button>
            <button className = "Repostbutton" onClick = {_showRepost.bind()}> Repost</button>
            {state.showRepost && (
              <>
                <Repost />
              </>
            )}
            </div>

    </div>
  )
}



export default PostContent
