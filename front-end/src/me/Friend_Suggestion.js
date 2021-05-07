import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import NameTag from '../auxiliary/NameTag'
import { Search } from 'react-bootstrap-icons'
import './Friend_Suggestion.css'
import { useHistory } from 'react-router-dom'

const Friend_Suggestion = (props) => {
    let history = useHistory()
    const [search_name, setSearch_name] = useState([])
    const [unfollowed_list, setUnfollowed_list] = useState([])
    const [following_list, setFollowing_list] = useState([])

    useEffect(() => {
       
        axios
            .get('/api_friend_suggestion', {
                params: {
                    search_name: search_name,
                },
            })
            .then((response) => {
                // extract the data from the server response
                setUnfollowed_list(response.data.unfollowed_list)
                setFollowing_list(response.data.following_list)
            })
            .catch(function (error) {
                if (error.response) {
                    if (error.response.status === 501) {
                        console.log('Error 501: user is not login; req.user does not exist')
                        alert('You are not logged in. Please log in and try again!')
                        history.push('/login')
                        setTimeout(() => {
                            window.location.href = window.location.href
                        }, 100)
                    }
                }
            })
    }, [search_name]) // only run it once!

    console.log(unfollowed_list)

    return (
        <div className='Friend_Suggestion'>
            <Link to='/Me'>
                <h1 id='back'>back</h1>
            </Link>
            <h1>Friend Suggestion</h1>
            <hr></hr>
            <div className='input-wrap'>
                <input className='input' type='search' placeholder='Search by user here' value={search_name} onInput={(e) => setSearch_name(e.target.value)} />
                <Search id='search_icon' color='grey' size={15} />
            </div>

            <section className='main-content'>
                <p className='desc'>{search_name == '' ? 'People You Might Know' : 'Searched Result'}</p>
                <p>
                    {unfollowed_list.map((item) => (
                        <NameTag key={item._id} img={item.user_photo} UserName={item.user_name} bio={item.bio} action='Follow' />
                    ))}
                </p>
            </section>

            <section className='main-content'>
                <p className='desc'>{search_name == '' ? 'Friend' : 'Friend'}</p>
                <p>
                    {following_list.map((item) => (
                        <NameTag key={item._id} img={item.user_photo} UserName={item.user_name} bio={item.bio} action='Unfollow' />
                    ))}
                </p>
            </section>
        </div>
    )
}

export default Friend_Suggestion
