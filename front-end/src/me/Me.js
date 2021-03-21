import React, { useState, useEffect } from 'react'
import './Me.css'
import { Link } from 'react-router-dom'
import { PersonPlus } from 'react-bootstrap-icons';
import { Facebook } from 'react-bootstrap-icons';
import { Instagram } from 'react-bootstrap-icons';
import { Twitter } from 'react-bootstrap-icons';
import { Gear } from 'react-bootstrap-icons';
import { ClockHistory } from 'react-bootstrap-icons';
import { TextParagraph } from 'react-bootstrap-icons';
import { HeartFill } from 'react-bootstrap-icons';



const Me = (props) => {

    return (
        <div className = "Me">
            <section id='header'>
                <Link to={'/addFriend'}> 
                    <PersonPlus id="addFriend" color='black' size={17}/> 
                
                </Link>
                
                <h1>Me</h1>
               

                <Link to = {'/settings'}>
                    <Gear id="setting" color='black' size={17}/> 
                </Link>
                
            </section>

            <section id='main_container1'>
                <div>
                    <p id='message_text' > 
                    <img class='inline-block' id='avatar' src="https://robohash.org/doloremqueofficiaet.jpg?size=50x50"/> 
                    <span class='inline-block' id='username' >Username</span>
                    <div id='bio'>Bio:</div>
                    </p>
                </div >

                <div id='post_follow'>
                    <Link id='button' to = '/profile'>
                        23
                        <br></br>
                        Posts
                    </Link>
                    <Link id='button' to = '/followers'>
                        4
                        <br></br>

                        Followers
                    </Link>
                    <Link id='button' to = '/followings'>
                        9
                        <br></br>
                        Following
                    </Link>
                    

                </div>
            </section>


        
            <section id="main_container2">
                <Link class='icon' to={'/liked'}> 
                    <HeartFill id='liked-icon' size={30} color="white"/>
                            <p id="liked">
                                Liked
                            </p>
                </Link>
                <Link class='icon' to={'/commented'}>
                    <TextParagraph id='commented-icon' size={30} color="white"/>
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

            <section id="main_container3">
                
                </section>
        </div>
    );
}

export default Me;