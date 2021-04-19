import React, { useState, useEffect } from 'react'
import './MyProfile.css'
import { Link } from 'react-router-dom'
import { ChevronLeft } from 'react-bootstrap-icons'
import { FileEarmarkPlus } from 'react-bootstrap-icons'
import axios from 'axios'
import PostContent from '../auxiliary/PostContent'
import { useHistory } from 'react-router-dom'
import Background_picture from './Background_picture'
import Linked_platform from './Linked_platform'

const MyProfile = (props) => {
    const [state, setState] = useState({
        showComment: false,
    })

    const _showComment = () => {
        let cur = state.showComment
        setState({
            showComment: !cur,
        })
    }

    const handleClick = (e) => {
        if (e === 'select_all_text') {
            console.log('select all platform')
            setPlatform_name_array(linked_social_media) //if click "All" text field, set platform_name_array to linked_social_media
        } else {
            console.log('select a single platform: ', e)
            setPlatform_name_array(e)
        }
    }

    let history = useHistory()
    const goTOPreviousPath = () => {
        history.goBack()
    }

    //set user_info
    const [user_info, setUser_info] = useState([])
    //set post_data
    const [post_data, setPost_data] = useState([])
    //set linked_social_media
    const [linked_social_media, setLinked_social_media] = useState([])

    //platform the is selected by user who browser the page
    let [platform_name_array, setPlatform_name_array] = useState([])

    //set border
    const [border, setBorder] = useState([])

    useEffect(() => {
        axios.get('/get_my_profile', {
            params: {
                platform_name_array: platform_name_array, //when send request to backend router /get_my_profile, send along platform_name_array in request
            },
        })
    })

    useEffect(() => {
        //request data from server once user open my_profile page
        console.log('fetching response from server')

        axios
            .get('/get_my_profile', {
                params: {
                    platform_name_array: platform_name_array, //when send request to backend router /get_my_profile, send along platform_name_array in request
                },
            })
            //deal with the response sent back from server
            .then((response) => {
                // response.data extract the data from the server response
                //console.log("response.data:", response.data)
                //console.log("response:", response.data)
                setUser_info(response.data.user_info)
                setPost_data(response.data.post_data)
                setLinked_social_media(response.data.linked_social_media)
                //handle click

                let elements = document.getElementsByTagName('IMG')
                //console.log('elements of icon:', elements)
                //console.log('elements.length:', elements.length)
                for (let i = 0; i < elements.length; i++) {
                    //console.log(i, 'th iteration')
                    //console.log('elements:', elements[i])

                    let element = elements[i]

                    if (element.id === 'O-Zone') {
                        element.addEventListener('click', function () {
                            //console.log('enter O-zone block')
                            console.log('selected O-Zone')
                            setPlatform_name_array('O-Zone')
                            setBorder('O-Zone')
                            //set border
                            document.getElementById('select_all_text').style.backgroundColor = 'rgba(195, 166, 197, 0.767)'
                        })
                    } else if (element.id === 'Facebook') {
                        element.addEventListener('click', function () {
                            //console.log('enter Facebook block')
                            console.log('selected Facebook')
                            setPlatform_name_array('Facebook')
                            setBorder('Facebook')
                            //set border

                            document.getElementById('select_all_text').style.backgroundColor = 'rgba(195, 166, 197, 0.767)'
                        })
                    } else if (element.id === 'Twitter') {
                        element.addEventListener('click', function () {
                            //console.log('enter Twitter block')
                            console.log('selected Twitter')
                            setPlatform_name_array('Twitter')
                            setBorder('Twitter')
                            //set border
                            document.getElementById('select_all_text').style.backgroundColor = 'rgba(195, 166, 197, 0.767)'
                        })
                    } else if (element.id === 'Instagram') {
                        element.addEventListener('click', function () {
                            console.log('enter Instagram block')
                            console.log('selected Instagram')
                            setPlatform_name_array('Instagram')
                            setBorder('Instagram')
                            //set border
                            document.getElementById('select_all_text').style.backgroundColor = 'rgba(195, 166, 197, 0.767)'
                        })
                    }
                }
            })
            .catch((err) => {
                console.log('error: cannot fetch response from server')
                console.log(err)
            }) //end of catch,axios
    }, [platform_name_array]) // render everytime platform_name header changes.

    return (
        <div className='MyProfile'>
            <section id='header'>
                <Link onClick={goTOPreviousPath}>
                    <ChevronLeft id='back' color='black' size={17} />
                </Link>
                <h1>Me</h1>

                <Link to={'/edit_new_post'}>
                    <FileEarmarkPlus id='create_post' color='black' size={17} />
                </Link>
            </section>

            <section id='main_container1'>
                <button className='Commentbutton' onClick={_showComment.bind()}>
                    Edit picture
                </button>
                {state.showComment && <>{<Background_picture />}</>}
                <img class='inline-block' id='background_picture' src={`${user_info.background_picture}`} /> {/* src is the url to request and find static file in public/ folder. don't use /static/url !!!!!!! it cause error*/}
                <div id='overview'>
                    <p id='message_text'>
                        <img class='inline-block' id='avatar' src={user_info.user_photo} />
                        <span class='inline-block' id='username'>
                            {user_info.user_name}
                        </span>
                        <br></br>

                        <span id='post_follow'>
                            <Link id='button' /*to = '/my_profile'*/>
                                {user_info.post_number}
                                <br></br>
                                Posts
                            </Link>

                            <Link
                                id='button'
                                to={{
                                    pathname: '/followers',
                                    state: {
                                        UserName: user_info.user_name,
                                    },
                                }}
                            >
                                {user_info.follower_number}
                                <br></br>
                                Followers
                            </Link>

                            <Link
                                id='button'
                                to={{
                                    pathname: '/followings',
                                    state: {
                                        UserName: user_info.user_name,
                                    },
                                }}
                            >
                                {user_info.following_number}
                                <br></br>
                                Following
                            </Link>
                        </span>

                        <span id='bio'>{user_info.bio}</span>
                    </p>
                </div>
            </section>

            <section>
                <h1>Linked Social Media</h1>

                <div id='main_container3'>
                    <div className='icon' id='select'>
                        {' '}
                        {/* target is the element clicked */}
                        <span
                            id='select_all_text'
                            className='selected'
                            onClick={(e) => {
                                console.log('all')
                                handleClick(e.target.id)
                            }}
                        >
                            All
                        </span>
                    </div>

                    {linked_social_media.map((item, i) => (
                        <Linked_platform key={item.id} details={item} />
                    ))}
                </div>
            </section>

            <section className='main-content4'>
                {post_data.map((item) => (
                    <PostContent key={item.id} like_switch = {item.like_switch} source={item.source} userimg={user_info.user_photo} UserName={user_info.user_name} content={item.content} Senttime={item.senttime} contentimg={item.contentimg} />
                ))}
            </section>
        </div>
    )
}

export default MyProfile
