import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './Mentions_List.css'
import Mentions from './Mentions'

const Mentions_List = (props) => {
    const [data, setData] = useState([])

    // the following side-effect will be called once upon initial render
    useEffect(() => {
        axios
            .get('/api_being_mentioned')
            .then((response) => {
                // extract the data from the server response
                setData(response.data)
                console.log('data fetched from backend: ', data)
            })
            .catch((err) => {
                console.error(err)
            })
    }, []) // only run it once!

    return (
        <div className='Mentions_List'>
            <Link to={'/community'}>
                <h1 id='back'>Back</h1>
            </Link>

            <h1 id='title'>Mentions</h1>

            <section className='Mentions_List'>
                {data.map((item) => (
                    <Mentions key={item.id} details={item} />
                ))}
            </section>
        </div>
    )
}

export default Mentions_List
