import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './Liked_List.css'
import Liked from '../auxiliary/Liked'
import { useHistory } from 'react-router-dom'

const Liked_List = (props) => {
    const [data, setData] = useState([])
    let history = useHistory()

    useEffect(() => {
        axios
            .get('/api_being_liked')
            .then((response) => {
                console.log(response)
                // extract the data from the server response
                setData(response.data)
                console.log('data fetched from backend: ', data)
            })
            .catch(function (error) {
                if (error.response) {
                    if (error.response.status === 501) {
                        console.log('Error 501: user is not login; req.user does not exist')
                        alert('You are not logged in. Please log in and try again!')
                        history.push('/prelogin')
                        setTimeout(() => {
                            window.location.href = window.location.href
                        }, 100)
                    }
                }
            })
    }, []) // only run it once!

    return (
        <div className='Liked_List'>
            <Link to={'/community'}>
                <h1 id='back'>Back</h1>
            </Link>
            <h1 id='title'>Likes</h1>

            <section className='liked_list'>
                {data.map((item) => (
                    <Liked key={item.id} details={item} />
                ))}
            </section>
        </div>
    )
}

export default Liked_List
