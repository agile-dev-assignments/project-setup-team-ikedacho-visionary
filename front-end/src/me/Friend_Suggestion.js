import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import NameTag from '../auxiliary/NameTag'
import { Search } from 'react-bootstrap-icons'
import './Friend_Suggestion.css'

const Friend_Suggestion = (props) => {
    const [data, setData] = useState([])
    const [search_name, setSearch_name] = useState([])
    const [unfollowed_list, setUnfollowed_list] = useState([])
    const [following_list, setFollowing_list] = useState([])

    useEffect(() => {
        // previous developer used my mockaroo API...:
        // "https://my.api.mockaroo.com/followings.json?key=2d6d6d60"
        axios
            .get('/api_friend_suggestion', {
                params: {
                    search_name: search_name
                },
            })
            .then((response) => {
                // extract the data from the server response
                setUnfollowed_list(response.data.unfollowed_list)
                setFollowing_list(response.data.following_list)
            })
            .catch((err) => {
                /*
        const backupData = []
        setData(backupData);*/
            })
    }, [search_name]) // only run it once!

    console.log(unfollowed_list)

    return (
        <div className='Friend_Suggestion'>
            <header>
                <Link to='/Me'>
                    <button>back</button>
                </Link>
                <h2>Friend Suggestion</h2>
                <p></p>
            </header>

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
                <p className='desc'>{search_name == '' ? 'Friend' : 'Searched Result'}</p>
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
