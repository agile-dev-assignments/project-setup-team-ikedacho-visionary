import React from 'react'
import { Link } from 'react-router-dom'
import './Liked.css'

const Liked = (props) => {
    // console.log(props);

    const date = new Date(Date.parse(props.details.like_issued_time))
    console.log(date.toString())

    return (
        <article className='liked'>
            <div>
                <Link
                    to={{
                        pathname: '/friend_profile',
                        state: {
                            UserName: props.details.liked_by_user_name,
                            userimg: props.details.liked_by_user_photo,
                        },
                    }}
                >
                    <img class='inline-block' id='avatar' src={props.details.liked_by_user_photo} />
                    <h1 class='inline-block' id='username1'>
                        {props.details.liked_by_user_name}
                    </h1>
                </Link>
                <span id='commented_date'>{props.details.liked_date}</span>
            </div>
            <p id='like'>liked the post at {date.toString().slice(3,24)}</p>

            <Link to={`/detailpost`}>
                <p id='post'>
                    <img id='post_image' src={props.details.img_content} />
                    <br></br>
                    <img class='inline-block' id='avatar2' src={props.details.user_photo} />
                    <span id='username'>{props.details.user_name}</span>
                    <br></br>
                    <br></br>
                    <div id='post_text'>{props.details.text_content}</div>
                </p>
            </Link>
        </article>
    )
}

// make this function available to be imported into another module
export default Liked
