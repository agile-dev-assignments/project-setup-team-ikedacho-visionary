import React from 'react'
import { Link } from 'react-router-dom'
import './Liked.css'

const Liked = (props) => {
    console.log(props);
    return (
    <article className="Liked">
            <div>
              <Link to={`/my_profile`}>
                <img class='inline-block' id="avatar" src={props.details.liked_by_profile} />
                <h1 class='inline-block' id='username1' >{props.details.liked_by_username}</h1>
                </Link>
                <span id="commented_date">{props.details.post_date}</span>
            </div>

        <p id='comment'>Commented @{props.details.post_created_by}: {props.details.post_text}</p>



        <Link to={`/detailpost`}>


                <p id='post' >
                <img id="post_image" src={props.details.post_image} />

                <br></br>
                <span id='username'>{props.details.liked_by_username}</span>
                <br></br>
                <br></br>
                <div id='post_text'>{props.details.liked_content}</div>
                </p>


        </Link>

    </article>
  )
}

// make this function available to be imported into another module
export default Liked
