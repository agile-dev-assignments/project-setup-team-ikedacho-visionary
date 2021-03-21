import React from 'react'
import { Link } from 'react-router-dom'
import './My_Comment_History.css'

const My_Comment_History = (props) => {
  // console.log(props);

  return (
    <article className="My_Comment_History">
       
            <div>
              <Link to={`/my_profile`}>
                <img class='inline-block' id="avatar" src="https://robohash.org/autplaceatatque.bmp?size=50x50" />
                <h1 class='inline-block' id='username1' >Username</h1>
                </Link>
                <span id="commented_date">{props.details.commented_date}</span>
            </div>
        
        <p id='comment'>Commented @{props.details.post_created_by}: {props.details.commented_content}</p>
       
        

        <Link to={`/post_content/${props.details.post_text}`}>
            
                
                <p id='post' >

            
                <img id="post_image" src={props.details.post_image} />
               
                <br></br>
                <span id='username'>{props.details.post_created_by}</span>
                <br></br>
                <br></br>
                <div id='post_text'>{props.details.post_text}</div>
                </p>
                
         
        </Link>

    </article>
  )
}

// make this function available to be imported into another module
export default My_Comment_History