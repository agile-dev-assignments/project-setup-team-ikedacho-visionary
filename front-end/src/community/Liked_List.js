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
            .catch((err) => {
                console.log(`error`)
                console.error(err) // the server returned an error... probably too many requests... until we pay!
                history.push('/prelogin')
                setTimeout(() => {
                    window.location.href = window.location.href
                }, 100)
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
