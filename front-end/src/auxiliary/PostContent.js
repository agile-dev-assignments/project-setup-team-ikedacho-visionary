import './PostContent.css'
import Repost from './ToRepost'
import React, { useState } from 'react'
import ToComment from './ToComment'
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom'
import { createBrowserHistory } from "history";

const PostContent = (props) => {

  const history = createBrowserHistory({forceRefresh:true})

  const [state, setState] = useState({
      showRepost: false,
      showComment: false
    })

  const [like, setLike] = useState({
      // check ../me/Liked.js
      // like_switch default to be TRUE when component is called from Like History page
      liked: props.like_switch
  })
 
  const _showRepost = () => {
    let cur = state.showRepost
    setState({
      showRepost: !cur
    })
  }

  const _showComment = () => {
    let cur = state.showComment
    setState({
      showComment: !cur
    })
  }

  const _setLike = () => {
    let cur = like.liked;
    setLike({
      liked: !cur
    })
  }

  const _PostDetail_with_param = (event) => {
    event.preventDefault()
    history.push({
      pathname: '/detailpost',
      state: props
    })
  }

  const _Friend_Profile_with_param = (event) => {
    event.preventDefault()
    const params = {
      UserName: props.UserName,
      userimg: props.userimg
    }
    history.push({
      pathname: '/friend_profile',
      state: params
    })
  }

  return (

    <div className="PostContent">
     
      <strong className = "PlatformSource">{props.source}</strong>
    
      <div className = "block">
     
          <img className = "userimg" onClick={_Friend_Profile_with_param.bind()} src = {props.userimg} />
        <div className="Text">
          <strong className = "username" onClick={_Friend_Profile_with_param.bind()}>{props.UserName}</strong>
          <p className = "time">{props.senttime.slice(0,10)+'   '+props.senttime.slice(11,19)}</p>
        </div>
      
      </div>

      <div
        title = "Go to Details"
        onClick = {_PostDetail_with_param.bind()}
      >
        <p className = "postcontent">{props.content}</p>
        <img className="contentimg" src={props.contentimg} />


      </div>
        
        <div className = "footer">
            <button className = "Commentbutton" onClick = {_showComment.bind()}>Comment</button>
            {/* inline style to show red Liked button when like_switch default to be TRUE*/}
            <button className = "Likebutton" style = {{backgroundColor: like.liked ? '#e37568' : 'white'}} onClick = {_setLike.bind()}>{like.liked ? 'Liked' : 'Like'}</button>
            <button className = "Repostbutton"  onClick = {_showRepost.bind()}>Repost</button>
 
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
