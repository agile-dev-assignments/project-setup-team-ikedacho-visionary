import React from 'react';
import Repost from './Repost'
import Comment from './Comment.js'

const Showcase = (props) => {

    return (
        <>
            <Repost />

            <Comment UserName = "Helen"
            img = "https://image.freepik.com/free-vector/smiling-girl-avatar_102172-32.jpg"
            content = "I really enjoyed this post! Looking forward to more of your post"
            Senttime = "2020/1/9 12:32"/>

        </>

    );
}

export default Showcase;