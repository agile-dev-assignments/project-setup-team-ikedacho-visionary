import React from 'react'
import './Liked.css'
import PostContent from '../auxiliary/PostContent'

const Liked = (props) => {

    return (
        
        <section className = "/me/Liked">
            <PostContent  
                key = {props.id}
                like_switch = {true}
                source = {props.source} 
                userimg = {props.userimg}
                UserName = {props.UserName}
                content = {props.content}
                Senttime = {props.Senttime} 
                contentimg = {props.contentimg} />
        </section>
    )
}
  
// make this function available to be imported into another module
export default Liked
