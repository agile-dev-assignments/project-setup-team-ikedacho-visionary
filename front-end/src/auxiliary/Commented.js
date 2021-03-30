import React from 'react'
import { Link } from 'react-router-dom'
//import user_info from '../me/Me'
import './Commented.css'

const Commented = (props) => {
  
  return (
    <article className="commented">

            <div>
              <Link to = {{
                pathname: '/friend_profile', 
                state: {
                    UserName: props.details.commented_by_username, 
                    userimg: props.details.commented_by_profile_image
                }}
              }>   
                <img class='inline-block' id='avatar' src={props.details.commented_by_profile_image} />
                <h1 class='inline-block' id='username1' >{props.details.commented_by_username}</h1>
              </Link>
                <span id="commented_date">{props.details.commented_date}</span>
            </div>
        
        <p id='comment'>Commented @Username: {props.details.commented_content}</p>
       
        

        <Link to={`/detailpost`}>
            
                
                <p id='post' >

                <img id="post_image" src={props.details.post_image} />
                <br></br>
                <span id='username'>@Username</span>
                <br></br>
                <br></br>
                <div id='post_text'>{props.details.post_text}</div>
                </p>
                
         
        </Link>

    </article>
  )
}

// make this function available to be imported into another module
export default Commented
