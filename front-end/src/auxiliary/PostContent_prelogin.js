import './PostContent.css'
import {Redirect, useHistory} from 'react-router-dom'
import React, { useState, useEffect } from 'react'
const PostContent = (props) => {
  const [state, setLike] = useState({
    login: false
})
const history = useHistory();
const _clicked = (e) => {
  setLike({
    login:true
  });
 
  // if(state.login == true){
  //   console.log(state.login);
    history.push("/signup");

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

        <p class = "postcontent">{props.content}</p>
        <img class="contentimg" src={props.contentimg} />
        <div class = "footer">
            <button class = "Commentbutton" onClick = {_clicked.bind()}> Comment</button>

            <button class = "Likebutton" onClick = {_clicked.bind()}>Like</button>
            <button class = "Repostbutton" onClick = {_clicked.bind()}> Repost</button>

            </div>

    </div>
  )
}



export default PostContent
