import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
// import logo from './logo.svg';

import './My_Comment_History_List.css'
import My_Comment_History from './My_Comment_History'

const My_Comment_History_List = (props) => {
    // start a state variable with a blank array
    const [data, setData] = useState([])

    // the following side-effect will be called once upon initial render
    useEffect(() => {
        // fetch some mock data about animals for sale
        console.log('fetching my comment history')
        axios('/api_my_comment_history')
            .then((response) => {
                // extract the data from the server response
                setData(response.data)
            })
            .catch((err) => {
                // Mockaroo, which we're using for our Mock API, only allows 200 requests per day on the free plan
                console.log(`Sorry, buster.  No more requests allowed today!`)
                console.error(err) // the server returned an error... probably too many requests... until we pay!
                // make some backup fake data of commented_history
            })
    }, []) // only run it once!

    return (
        <div className='My_Comment_History_List'>
            <Link to={'/me'}>
                <h1 id='back'>Back</h1>
            </Link>
            <h1 id='title'>My Comment History</h1>
            <section className='My_Comment_History_List'>
                {data.map((item) => (
                    <My_Comment_History key={item.id} details={item} />
                ))}
            </section>
        </div>
    )
}
export default My_Comment_History_List
