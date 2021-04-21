import React from 'react'
import { Link } from 'react-router-dom'
import './Mentions.css'

const Mentions = (props) => {
    return (
        <article className='mentions'>
            <div>
                <Link
                    to={{
                        pathname: '/friend_profile',
                        state: {
                            UserName: props.details.mentioner_username,
                            userimg: props.details.mentioner_avatar,
                        },
                    }}
                >
                    <img class='inline-block' id='avatar' src={props.details.mentioner_avatar} />
                    <h1 class='inline-block' id='username1'>
                        {props.details.mentioner_username}
                    </h1>
                </Link>
                <span id='mentioned_date'>{new Date(props.details.mentioned_date).toLocaleString()}</span>
                <span id='mentioned_comment_text'>{props.details.comment_text}</span>
            </div>

            <Link to={{
                pathname: '/detailpost', 
                state: {
                    UserName: props.details.post_username, 
                    userimg: props.details.post_avatar, 
                    content: props.details.post_text, 
                    contentimgs: props.details.post_image
                }
                }}>
                <p id='post'>
                    {/* so, we probably want the back-end/database to
              return the first image if the post contains multiple */}
                    <img id='post_image' src={props.details.post_image} />
                    <br></br>
                    <span id='username'>{props.details.post_username}</span>
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
