import React from 'react';
import Repost from './Repost'
import Comment from './Comment.js'
import NameTag from './NameTag';
import PostContent from './PostContent.js'


const Showcase = (props) => {
    
    function makeName(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    function newPerson() {
        const obj = {}
        obj.name = makeName(5)
        obj.pic = "https://picsum.photos/50"
        return obj
    }

    let platforms = ["Facebook", "Twitter", "Instagram", "Weibo"]
    let friends = [newPerson(), newPerson(), newPerson(), newPerson()]

    return (
        <>
            <div class = "repostCom">
            <Repost platforms = {platforms} friends = {friends}/>
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


            <NameTag UserName = "Helen"
            img = "https://cdn.icon-icons.com/icons2/1368/PNG/512/-avatar_89781.png"
            bio = "A passionate evening brings both pleasure and pain. "
            action = "Following"
            />
        </>

    );
}

export default Showcase;