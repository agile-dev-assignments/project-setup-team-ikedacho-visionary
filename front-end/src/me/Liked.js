import React from 'react'
import { Link } from 'react-router-dom'
import './Liked.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import PostContent from '../auxiliary/PostContent'

const Liked = (props) => {
    /* 
    Note that this file has been entirely overwritten by Xinyu Xie, 
    Because neither of two previous version was correct. 

    Check Github pull request / commit history for details, 
    But I would suggest simply go with this version without further thinking. 

        added time: 2021/3/27 16:45 China Time
        author: Xinyu Xie
    */
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
