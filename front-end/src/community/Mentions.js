import React from 'react'
import { Link } from 'react-router-dom'
import './Mentions.css'

const Mentions = (props) => {


  return (
    <article className="mentions">

            <div>
            <Link to={`/friend_profile`}>
                <img class='inline-block' id='avatar' src={props.details.post_image} />
                <h1 class='inline-block' id='username1' >{props.details.mentioned_by_username}</h1>
                </Link>
                <span id="commented_date">{props.details.mentioned_date}</span>
            </div>

        <p id='like'>{props.details.mentioned_content}</p>



        <Link to={`/detailpost`}>


                <p id='post' >

                <img id="post_image" src={props.details.post_image} />
                <br></br>
                <span id='username'>{props.details.mentioned_by_username}</span>
                <br></br>
                <br></br>
                <div id='post_text'>{props.details.post_text}</div>
                </p>


        </Link>

    </article>
  )
}

// make this function available to be imported into another module
export default Mentions