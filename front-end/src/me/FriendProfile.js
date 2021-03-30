import React, { useState, useEffect } from 'react'
import './FriendProfile.css'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { ChevronLeft } from 'react-bootstrap-icons';
import { Facebook } from 'react-bootstrap-icons';
import { Instagram } from 'react-bootstrap-icons';
import { Twitter } from 'react-bootstrap-icons';

import { Youtube } from 'react-bootstrap-icons';
import { Linkedin } from 'react-bootstrap-icons';
import axios from 'axios'
import PostContent from '../auxiliary/PostContent'



const FriendProfile = (props) => {

    let history = useHistory();
    const {state} = useLocation()

    const goTOPreviousPath = () => {
        history.goBack()
    }
    // start a state variable with a blank array
    const [friend_info, setFriend_info] = useState([])
    const [data, setData] = useState([])

    // the following side-effect will be called once upon initial render
    useEffect(() => {
        // 'https://my.api.mockaroo.com/sr.json?key=2d6d6d60'
        axios
            .get("/api_friend_profile", {
                params: {
                    UserName: state.UserName, 
                    userimg: state.userimg
                }
            })
            .then((response) => {
                // extract the data from the server response
                setData(response.data.posts)
                setFriend_info(response.data.friend_info)
            })
            .catch((err) => {
                console.log('Error that should never happen!')
            })
        }, []) // only run it once!
    return (
        <div className = "FriendProfile">
            <section id='header'>
                <Link onClick={goTOPreviousPath}> 
                    <ChevronLeft id="back" color='black' size={17}/> 
                </Link>
                <h1>Profile</h1>
            </section>
        
            <section id='main_container1'>
                <div id="overview">
                    <p id='message_text' > 
                        <img class='inline-block' id='avatar' src={friend_info.user_photo}/> 
                        <span class='inline-block' id='username'>{friend_info.user_name}</span>
                        <br></br>

                        <span id='post_follow'>
                            {/*<Link id='button' to = '/my_profile'>*/}
                                {friend_info.post_number}
                                <br></br>
                                Posts
                            {/*</Link>*/}

                            <Link id='button' to = '/followers'>
                                {friend_info.follower_number}
                                <br></br>
                                Followers
                            </Link>

                            <Link id='button' to = '/followings'>
                                {friend_info.following_number}
                                <br></br>
                                Following
                            </Link>
                        </span>

                        <span id='bio'>{friend_info.bio}</span>
                    </p>

                    <button id='button2' onClick={() => alert("following is clicked (to unfollow)!")}>
                            Following
                    </button>
                    
                    <Link to = {{
                                pathname: '/chat', 
                                state: {
                                    user_name: friend_info.user_name, 
                                    user_photo: friend_info.user_photo
                                }}
                    }>
                        <button id='button2' onClick={() => {}}>
                                Chat
                        </button>
                    </Link>
                </div >
            </section>
            
            <section>
                <h1>Linked Social Medias</h1>  
                <div  id="main_container3">
                    <div class='icon'> 
                        <Facebook id='liked-icon' size={30} color="white"/>                           
                    </div>
                    <div class='icon' >
                        <Twitter id='commented-icon' size={30} color="white"/>
                    </div>

                    <div class='icon'>
                        <Instagram id='browse_history_icon' size={30} color="white"/>                     
                    </div>

                    <div class='icon' >
                        <Youtube id='commented-icon' size={30} color="white"/>                  
                    </div>

                    <div class='icon'>
                        <Linkedin id='browse_history_icon' size={30} color="white"/>                 
                    </div> 
                </div>
            </section>

            <section>
                <section className = "main-content4">
                    {data.map((item) => (
                        <PostContent 
                            key={item.id}
                            source = {item.source} 
                            userimg = {friend_info.user_photo}
                            UserName = {friend_info.user_name}
                            content = {item.content}
                            Senttime = {item.Senttime} 
                            contentimg = {item.contentimg} />
                    ))} 
                </section>
            </section>
        </div>
    );
}

export default FriendProfile;
