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
import axios from 'axios'
import PostContent from '../auxiliary/PostContent'
import { useHistory } from 'react-router-dom'


const MyProfile = (props) => {

    let history=useHistory();
    const goTOPreviousPath=()=>{
        history.goBack()
    }

    //set user_info
    const [user_info,setUser_info] = useState([])
    //set post_data
    const [post_data,setPost_data] = useState([])

    // the following side-effect will be called once upon initial render
    useEffect(() => {
        //request data from server once user open my_profile page
        console.log('fetching response from server')
        axios('/my_profile')
            //deal with the response sent back from server
            .then((response) => {
                // response.data extract the data from the server response
                //console.log("response.data:", response.data)
                console.log("response:", response.data)

                setUser_info(response.data.user_info)
                setPost_data(response.data.post_data)
            })
            .catch((err) => {
                console.log("error: cannot fetch response from server")
                console.log(err)
            })
        }, []) // only run it once!


        
    return (
        <div className = "MyProfile">
            <section id='header'>
                <Link onClick={goTOPreviousPath}> 
                    <ChevronLeft id="back" color='black' size={17}/> 
                
                </Link>
                
                <h1>Me</h1>
               

                <Link to = {'/edit_new_post'}>
                    <FileEarmarkPlus id="create_post" color='black' size={17}/> 
                </Link>
                
            </section>
           
            <section id='main_container1'>
                <div id="overview">
                    <p id='message_text' > 
                        <img class='inline-block' id='avatar' src={user_info.user_photo}/> 
                        <span class='inline-block' id='username'>{user_info.user_name}</span>
                        <br></br>
                       

                        <span id='post_follow'>
                        <Link id='button' to = '/my_profile'>
                        {user_info.post_number}
                            <br></br>
                            Posts
                        </Link>

                        <Link id='button' to = '/followers'>
                        {user_info.follower_number}
                            <br></br>

                            Followers
                        </Link>
                        <Link id='button' to = '/followings'>
                        {user_info.following_number}
                            <br></br>
                            Following
                        </Link>
                        </span>

                        <span id='bio'>{user_info.bio}</span>
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
        <section>
        <section className = "main-content4">
                {post_data.map((item) => (
                        <PostContent 
                            key={item.id}
                            source = {item.source} 
                            userimg = {user_info.user_photo}
                            UserName = {user_info.user_name}
                            content = {item.content}
                            Senttime = {item.Senttime} 
                            contentimg = {item.contentimg} />
                    ))} 
            </section>
        </section>
         

        </div>
    );
}

export default MyProfile;
