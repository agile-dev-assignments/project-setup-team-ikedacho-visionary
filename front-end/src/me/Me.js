import React, { useState, useEffect } from 'react'
import './Me.css'
import { Link, NavLink } from 'react-router-dom'
import { PersonPlus } from 'react-bootstrap-icons';
import { Facebook } from 'react-bootstrap-icons';
import { Instagram } from 'react-bootstrap-icons';
import { Twitter } from 'react-bootstrap-icons';
import { Gear } from 'react-bootstrap-icons';
import { ClockHistory } from 'react-bootstrap-icons';
import { TextParagraph } from 'react-bootstrap-icons';
import { HeartFill } from 'react-bootstrap-icons';
import { Youtube } from 'react-bootstrap-icons';
import { Linkedin } from 'react-bootstrap-icons';




const Me = (props) => {

    const [facebook, setFacebook] = useState('connected')
    const [twitter, setTwitter] = useState('connected')
    const [instagram, setInstagram] = useState('connected')
    const [youtube, setYoutube] = useState('connect')
    const [linkedin, setLinkedin] = useState('connect')
    
    const handleClick1=()=>{
        console.log('clicked')
        if (facebook==='connect'){
            setFacebook('connected');
        }
        else if (facebook==='connected'){
            setFacebook('connect');
        }
    }
   
    const handleClick2=()=>{
        console.log('clicked')
        if (twitter==='connect'){
            setTwitter('connected');
        }
        else if (twitter==='connected'){
            setTwitter('connect');
        }
    }
    const handleClick3=()=>{
        console.log('clicked')
        if (instagram==='connect'){
            setInstagram('connected');
        }
        else if (instagram==='connected'){
            setInstagram('connect');
        }
        console.log(instagram)
    }
    const handleClick4=()=>{
        console.log('clicked')
        if (youtube==='connect'){
            setYoutube('connected');
        }
        else if (youtube==='connected'){
            setYoutube('connect');
        }
    }
    const handleClick5=()=>{
        console.log('clicked')
        if (linkedin==='connect'){
            setLinkedin('connected');
        }
        else if (linkedin==='connected'){
            setLinkedin('connect');
        }
    }

    // start a state variable with a blank array
    const [user_info, setUser_info] = useState(
        {
        "id": 1,
        "user_name": "Joe",
        "user_photo": "https://robohash.org/doloremqueofficiaet.jpg?size=50x50",
        "post_number": "116",
        "bio":"I love cat",
        "follower_number": "500",
        "following_number": "200",
        "linked_social_media": ["Facebook","Twitter","Instagram","TikTok"]
      })
   
    return (
        <div className = "Me">
            <section id='header'>
                <Link to={'/friend_suggestion'}> 
                    <PersonPlus id="addFriend" color='black' size={17}/> 
                
                </Link>
                
                <h1>Me</h1>
               

                <Link to = {'/settings'}>
                    <Gear id="setting" color='black' size={17}/> 
                </Link>
                
            </section>

            <section id='main_container1'>
                <Link to = '/my_profile'>
                <div>
                
                    <p id='message_text' > 
                    <img class='inline-block' id='avatar' src={user_info.user_photo}/> 
                    <span class='inline-block' id='username'>{user_info.user_name}</span>
                    <div id='bio'>{user_info.bio}</div>
                    </p>
                </div >
                </Link>

                <div id='post_follow'>
                    <Link id='button' to = '/my_profile'>
                    {user_info.post_number}
                        <br></br>
                        Posts
                    </Link>

                    <Link id='button' to = {{
                        pathname: '/followers', 
                        state: {
                            UserName: user_info.user_name, 
                        }}
                    }>  
                        {user_info.follower_number}
                        <br></br>
                        Followers
                    </Link>

                    <Link id='button' to = {{
                        pathname: '/followings', 
                        state: {
                            UserName: user_info.user_name, 
                        }}
                    }>  
                        {user_info.following_number}
                        <br></br>
                        Following
                    </Link>
                </div>
            </section>


        
            <section id="main_container2">
                <Link class='icon' to={'/liked'}> 
                    <HeartFill id='browse_history_icon' size={30} color="white"/>
                            <p id="liked">
                                Liked
                            </p>
                </Link>
                <Link class='icon' to={'/my_comment_history'}>
                    <TextParagraph id='browse_history_icon' size={30} color="white"/>
                        <p id="commented" >
                                Commented
                        </p>
                </Link>

                <Link class='icon' to={'/browse_history'}>
                    <ClockHistory id='browse_history_icon' size={30} color="white"/>
                        <p id="browse_history">
                            Browse History
                        </p>
                </Link>
            </section>

            
            <section>
               
            <h1>Linked Social Medias</h1>  
            <div  id="main_container3">
                <div class='icon'> 
                    <Facebook id='browse_history_icon' size={30} color="white"/>
                        <button id="button1" onClick={handleClick1}>
                        {facebook}
                        </button>

                </div>
                <div class='icon' >
                    <Twitter id='browse_history_icon' size={30} color="white"/>
                        <button id="button1" onClick={handleClick2}>
                       {twitter}
                        </button>
                </div>

                <div class='icon'>
                    <Instagram id='browse_history_icon' size={30} color="white"/>
                        <button id="button1" onClick={handleClick3} >
                      {instagram}
                        </button>
                </div>
                <div class='icon'>
                    <Youtube id='browse_history_icon' size={30} color="white"/>
                        <button id="button1" onClick={handleClick4}>
                    {youtube}
                        </button>
                </div>
                <div class='icon'>
                    <Linkedin id='browse_history_icon' size={30} color="white"/>
                        <button id="button1" onClick={handleClick5}>
                   {linkedin}
                        </button>
                </div>

                </div>


            </section>

         

        </div>
    );
}

export default Me;
