import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
// import logo from './logo.svg';
import './Commented_List.css'
import Commented from '../auxiliary/Commented'

const Commented_List = (props) => {
    // start a state variable with a blank array
    const [data, setData] = useState([])

    // the following side-effect will be called once upon initial render
    useEffect(() => {
        console.log('fetching commented history')
        axios('/api_commented_history')
            .then((response) => {
                // extract the data from the server response
                setData(response.data)
                console.log('response_data:', data)
            })
            .catch((err) => {
                // Mockaroo, which we're using for our Mock API, only allows 200 requests per day on the free plan
                console.log(`Sorry, buster.  No more requests allowed today!`)
                console.error(err) // the server returned an error... probably too many requests... until we pay!
                // make some backup fake data of commented_history
            })
    }, []) // only run it once!

    return (
        <div className='Commented_List'>
            <Link to={'/community'}>
                <h1 id='back'>Back</h1>
            </Link>
            <h1 id='title'>Comments</h1>

            <section className='commented_list'>
                {data.map((item) => (
                    <Commented key={item.id} details={item} />
                ))}
            </section>
        </div>
    )
}

export default Commented_List
