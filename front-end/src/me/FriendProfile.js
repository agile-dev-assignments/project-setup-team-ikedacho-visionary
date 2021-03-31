import React, { useState, useEffect } from 'react'
import './FriendProfile.css'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { ChevronLeft } from 'react-bootstrap-icons';
import axios from 'axios'
import PostContent from '../auxiliary/PostContent'
import Linked_platform from './Linked_platform';

const FriendProfile = (props) => {

    let history = useHistory();
    const {state} = useLocation()

    const goTOPreviousPath = () => {
        history.goBack()
    } 
    // start a state variable with a blank array
    const [friend_info, setFriend_info] = useState([])
    const [post_data, setData] = useState([])
    const [linked_social_media,setLinked_social_media] = useState([])
    //platform the is selected by user who browser the page
    let [platform_name_array, setPlatform_name_array] = useState([]);

    const handleClick=(e)=>{//e is the id of the element clicked

        //only allow one selection. select one platform, then only show post from that platform. if e="select_all_text", then show posts from all platfrom
        if( e==="select_all_text" ){
            console.log('select all platform')
            setPlatform_name_array(linked_social_media) //if click "All" text field, set platform_name_array to linked_social_media
        }
        else{
            console.log('select a single platform: ',e)
            setPlatform_name_array(e);
        }   


    }
    const handleClick2=(e)=>{
            console.log('selected Facebook')
            setPlatform_name_array("Facebook");
    }
    const handleClick3=(e)=>{
        console.log('selected Twitter')
        setPlatform_name_array("Twitter");
    }
    const handleClick4=(e)=>{
        console.log('selected Instagram')
        setPlatform_name_array("Instagram");
    }

    // the following side-effect will be called once upon initial render
    useEffect(() => {
        // 'https://my.api.mockaroo.com/sr.json?key=2d6d6d60'
        axios
            .get("/api_friend_profile", {
                //add some params in the request that will send to /api_friend_profile here.
                params: {
                    UserName: state.UserName, //when send request to backend router /api_friend_profile, send along state.UserName as UserName in request
                    userimg: state.userimg,    //when send request to backend router /api_friend_profile, send along state.userimg as userimg in request
                    platform_name_array: platform_name_array //platform user selected
                }
            })
            .then((response) => {
                // extract the data from the server response
                setData(response.data.post_data) 
                setFriend_info(response.data.friend_info)
                setLinked_social_media(response.data.linked_social_media) 
                  //handle click
                let element = document.getElementById("Facebook")
                element.addEventListener('click',handleClick2)

                let element2 = document.getElementById("Twitter")
                element2.addEventListener('click',handleClick3)
                
                let element3 = document.getElementById("Instagram")
                element3.addEventListener('click',handleClick4)
            })
            .catch((err) => {
                console.log('Error that should never happen!')
            })
        }, [platform_name_array]) // only run it once!
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
                            <Link id='button' /*to = '/my_profile'*/>
                                {friend_info.post_number}
                                <br></br>
                                Posts
                            </Link>

                            <Link id='button' to = {{
                                pathname: '/followers', 
                                state: {
                                    UserName: friend_info.user_name, //pass friend_info.user_name as UserName to /followers request
                                }}
                            }>    
                                {friend_info.follower_number}
                                <br></br>
                                Followers
                            </Link>

                            <Link id='button' to = {{
                                pathname: '/followings', 
                                state: {
                                    UserName: friend_info.user_name, 
                                }}
                            }>  
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
               
                <div id="main_container3">
                    <div className='icon' id='select'  >  {/* target is the element clicked */}
                        <span id='select_all_text' onClick={e=> {console.log('all'); handleClick(e.target.id) }} >All</span>
                    </div>


                    {linked_social_media.map((item,i) => (
                        <Linked_platform 

                            key={item.id}
                            details={item}
                        />

                    ))} 
                    
                </div>
            </section>

            <section>
                <section className = "main-content4">
                    {post_data.map((item) => (
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
