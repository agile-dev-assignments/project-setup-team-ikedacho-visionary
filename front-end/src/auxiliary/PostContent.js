import './PostContent.css'
import Repost from './ToRepost'
import React, { useState } from 'react'
import ToComment from './ToComment'
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom'
import { createBrowserHistory } from "history";
const PostContent = (props) => {
  const history = createBrowserHistory({forceRefresh:true});

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
    });
  };
  const _showComment = () => {
    let cur = state.showComment
    setState({
      showComment: !cur
    });
  };

  const _setLike = (e) => {
    let cur = like.liked;
    setLike({
      liked: !cur
    });
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
   history.push({
      pathname: '/detailpost',
      state:props
    });
  };
  return (

    <div className="PostContent">
     
      <strong className = "PlatformSource">{props.source}</strong>
    
      <div className = "block">
     
          <img className = "userimg" onClick={() => window.location.href = '/friend_profile'} src = {props.userimg} />
        
        
        <div className="Text">
          <strong className = "username" onClick={() => window.location.href = '/friend_profile'}>{props.UserName}</strong>
          <p className = "time">{props.Senttime}</p>
        </div>
      
      </div>

      <div
        title="Go to Details"
        onClick={handleOnSubmit.bind()}
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
