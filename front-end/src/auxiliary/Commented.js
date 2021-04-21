import React from 'react'
import { Link } from 'react-router-dom'
//import user_info from '../me/Me'
import './Commented.css'

const Commented = (props) => {
    return (
        <article className='commented'>
            <div>
                <Link
                    to={{
                        pathname: '/friend_profile',
                        state: {
                            UserName: props.details.commented_by_username,
                            userimg: props.details.commented_by_profile_image,
                        },
                    }}
                >
                    <img class='inline-block' id='avatar' src={props.details.commented_by_profile_image} />
                    <h1 class='inline-block' id='username1'>
                        {props.details.commented_by_username}
                    </h1>
                </Link>
                <span id='commented_date'>{props.details.commented_date.slice(0,10) + "  "+props.details.commented_date.slice(11,19) }</span>
            </div>

            <p id='comment'>Commented: {props.details.comment_text}</p>

            <Link
                to={{
                    pathname: '/detailpost',
                    state: {
                        UserName: props.details.post_created_by, //pass friend_info.user_name as UserName to /followers request
                        userimg: props.details.post_created_by_photo,
                        content: props.details.post_text,
                        Senttime: props.details.post_date,
                        source: props.details.source,
                    },
                }}
            >
                <p id='post'>
                    <img id='post_image' src={props.details.post_image} />
                    <br></br>
                    <span id='username'>@{props.details.post_created_by}</span>
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
