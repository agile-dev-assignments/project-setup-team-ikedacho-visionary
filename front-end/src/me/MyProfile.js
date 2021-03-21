import React, { useState, useEffect } from 'react'
import './MyProfile.css'
import { Link } from 'react-router-dom'
import { ChevronLeft } from 'react-bootstrap-icons';
import { Facebook } from 'react-bootstrap-icons';
import { Instagram } from 'react-bootstrap-icons';
import { Twitter } from 'react-bootstrap-icons';
import { FileEarmarkPlus } from 'react-bootstrap-icons';
import { ClockHistory } from 'react-bootstrap-icons';
import { TextParagraph } from 'react-bootstrap-icons';
import { HeartFill } from 'react-bootstrap-icons';
import { Youtube } from 'react-bootstrap-icons';
import { Linkedin } from 'react-bootstrap-icons';



const MyProfile = (props) => {
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
        <div className = "MyProfile">
            <section id='header'>
                <Link to={'/me'}> 
                    <ChevronLeft id="back" color='black' size={17}/> 
                
                </Link>
                
                <h1>Me</h1>
               

                <Link to = {'/settings'}>
                    <FileEarmarkPlus id="create_post" color='black' size={17}/> 
                </Link>
                
            </section>
           
            <section id='main_container1'>
                <div id="overview">
                    <p id='message_text' > 
                    <img class='inline-block' id='avatar' src={user_info.user_photo}/> 
                    <span class='inline-block' id='username'>{user_info.user_name}</span>
                    <div id='bio'>{user_info.bio}</div>
                    </p>
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
                
                </div>


            </section>

         

        </div>
    );
}

export default MyProfile;
