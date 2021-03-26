import React, { useState, useEffect } from 'react'
import './FriendProfile.css'
import { Link, useHistory } from 'react-router-dom'
import { ChevronLeft } from 'react-bootstrap-icons';
import { Facebook } from 'react-bootstrap-icons';
import { Instagram } from 'react-bootstrap-icons';
import { Twitter } from 'react-bootstrap-icons';

import { Youtube } from 'react-bootstrap-icons';
import { Linkedin } from 'react-bootstrap-icons';
import axios from 'axios'
import PostContent from '../auxiliary/PostContent'


const FriendProfile = (props) => {
  
    let history=useHistory();
    const goTOPreviousPath=()=>{
        history.goBack()
    }
    // start a state variable with a blank array
    const [friend_info, setFriend_info] = useState(
        {
        "id": 1,
        "user_name": "Nina",
        "user_photo": "https://robohash.org/consequaturculpamaxime.png?size=50x50\u0026set=set1",
        "post_number": "300",
        "bio":"studying",
        "follower_number": "400",
        "following_number": "298",
        "linked_social_media": ["Facebook","Twitter","Instagram","Youtube","Linkedin"]
      })
      const [data, setData] = useState([])

        // the following side-effect will be called once upon initial render
        useEffect(() => {

        axios('https://my.api.mockaroo.com/sr.json?key=2d6d6d60')
            .then((response) => {
                // extract the data from the server response
                setData(response.data)
            })
            .catch((err) => {
                const backupData = [{"source":"Konklux","userimg":"https://robohash.org/laboriosamaliquamconsequuntur.jpg?size=50x50\u0026set=set1","UserName":"mgalliard0","content":"Aaaahhhhhh! I do not know what to say. ","Senttime":"10/18/2020","contentimg":"http://dummyimage.com/112x136.jpg/cc0000/ffffff"},{"source":"Domainer","userimg":"https://robohash.org/utculpaesse.png?size=50x50\u0026set=set1","UserName":"hrevie1","content":"Aaaahhhhhhhhhhh! I do not know what to say. ","Senttime":"4/15/2020","contentimg":"http://dummyimage.com/228x124.bmp/cc0000/ffffff"},{"source":"Ventosanzap","userimg":"https://robohash.org/etquosa.bmp?size=50x50\u0026set=set1","UserName":"avedenisov2","content":"Aaaahhhhh! I do not know what to say. ","Senttime":"2/5/2021","contentimg":"http://dummyimage.com/107x217.jpg/5fa2dd/ffffff"},{"source":"Lotlux","userimg":"https://robohash.org/inciduntatest.png?size=50x50\u0026set=set1","UserName":"fhenniger3","content":"Aaaahhhhhhhhhhhhh! I do not know what to say. ","Senttime":"3/1/2021","contentimg":"http://dummyimage.com/219x227.jpg/5fa2dd/ffffff"},{"source":"Span","userimg":"https://robohash.org/quidemquicupiditate.bmp?size=50x50\u0026set=set1","UserName":"gmacqueen4","content":"Aaaahhhhhhhhhhhhhh! I do not know what to say. ","Senttime":"5/21/2020","contentimg":"http://dummyimage.com/185x108.bmp/dddddd/000000"},{"source":"Namfix","userimg":"https://robohash.org/dolorcumqueeaque.png?size=50x50\u0026set=set1","UserName":"gmorot5","content":"Aaaahhhhhhhhhhhh! I do not know what to say. ","Senttime":"9/27/2020","contentimg":"http://dummyimage.com/223x118.jpg/5fa2dd/ffffff"},{"source":"Overhold","userimg":"https://robohash.org/oditdolorenesciunt.png?size=50x50\u0026set=set1","UserName":"mmcileen6","content":"Aaaahhhhhhhhhhhh! I do not know what to say. ","Senttime":"6/17/2020","contentimg":"http://dummyimage.com/181x111.bmp/5fa2dd/ffffff"},{"source":"Pannier","userimg":"https://robohash.org/etnobisest.jpg?size=50x50\u0026set=set1","UserName":"gthrustle7","content":"Aaaahhhhhhhhhhhhhhh! I do not know what to say. ","Senttime":"5/2/2020","contentimg":"http://dummyimage.com/161x248.png/ff4444/ffffff"},{"source":"Overhold","userimg":"https://robohash.org/oditautet.jpg?size=50x50\u0026set=set1","UserName":"rlafond8","content":"Aaaahhhhhh! I do not know what to say. ","Senttime":"3/21/2020","contentimg":"http://dummyimage.com/123x113.png/5fa2dd/ffffff"},{"source":"Bamity","userimg":"https://robohash.org/autdeleniticonsequuntur.bmp?size=50x50\u0026set=set1","UserName":"ckarleman9","content":"Aaaahhhhhh! I do not know what to say. ","Senttime":"11/14/2020","contentimg":"http://dummyimage.com/234x151.jpg/cc0000/ffffff"}
                ]
                setData(backupData)
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
                        <Link id='button' to = '/my_profile'>
                        {friend_info.post_number}
                            <br></br>
                            Posts
                        </Link>

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
                    
                    <button id='button2' onClick={() => window.location.href = '/chat'}>
                            Chat
                    </button>
                    
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
