import React from 'react'
import { Link } from 'react-router-dom'
import './Mentions.css'

const Mentions = (props) => {


  return (
    <article className = "mentions">

      <div>
          <img class = 'inline-block' id = 'avatar' src={props.details.mentioner_avatar} onClick={() => window.location.href = '/friend_profile'}/>
          <h1 class = 'inline-block' id = 'username1' onClick={() => window.location.href = '/friend_profile'}>{props.details.mentioner_username}</h1>
          <span id = "mentioned_date">{props.details.mentioned_date}</span>
      </div>

      <Link to={`/detailpost`}>
        <p id = 'post' >
          {/* so, we probably want the back-end/database to
              return the first image if the post contains multiple */}
          <img id = "post_image" src = {props.details.post_image} />
          <br></br>
          <span id = 'username'>{props.details.post_username}</span>
          <br></br>
          <br></br>
          <div id = 'post_text'>{props.details.post_text}</div>
        </p>
      </Link>

    </article>
  )
}

// make this function available to be imported into another module
export default Mentions
