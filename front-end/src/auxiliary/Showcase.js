import React from 'react';
import Repost from './Repost'
import Comment from './Comment.js'
import NameTag from './NameTag';

const Showcase = (props) => {

    let platforms = ["Facebook", "Twitter", "Instagram", "Weibo"]

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

    let friends = [newPerson(), newPerson(), newPerson(), newPerson()]

    return (
        <>
            
            <Repost platforms = {platforms} friends = {friends}/>

            <Comment UserName = "Helen"
            img = "https://image.freepik.com/free-vector/smiling-girl-avatar_102172-32.jpg"
            content = "I really enjoyed this post! Looking forward to more of your post"
            Senttime = "2020/1/9 12:32"/>


            <NameTag UserName = "Helen"
            img = "https://cdn.icon-icons.com/icons2/1368/PNG/512/-avatar_89781.png"
            bio = "A passionate evening brings both pleasure and pain. "
            action = "Following"
            />
        </>

    );
}

export default Showcase;