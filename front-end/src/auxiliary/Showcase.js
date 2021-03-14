import React from 'react';
import Repost from './Repost'
import Comment from './Comment.js'
import PostContent from './PostContent.js'

const Showcase = (props) => {

    return (
        <>
        <div class = "repostCom">
        <Repost />
        </div>
        <br></br>
        <div class = "CommentCom">
            <Comment UserName = "Helen"
            img = "https://image.freepik.com/free-vector/smiling-girl-avatar_102172-32.jpg"
            content = "I really enjoyed this post! Looking forward to more of your post"
            Senttime = "2020/1/9 12:32"/>
        </div>
        <br></br>
        <div class = "postcom">
            <PostContent UserName = "Jessica"
            source = "Instagram"
            userimg = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzIu8kI5RdzA0toecWakNnvZwWYT4HBPo8ZQ&usqp=CAU"
            content = "Lebron James!"
            contentimg = "https://www.denverpost.com/wp-content/uploads/2020/06/AP20120853090391.jpg"
            Senttime = "2020/1/8 10:32"
            />  
            </div> 

        </>

    );
}

export default Showcase;