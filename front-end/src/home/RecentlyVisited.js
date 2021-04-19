import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PostContent from '../auxiliary/PostContent'
import './RecentlyVisited.css'

const RecentlyVisited = (props) => {
    const [data, setData] = useState([])

    // the following side-effect will be called once upon initial render
    useEffect(() => {
        axios('/api_recent')
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
        <div className='Recently-Visited'>
            <section className='main-content'>
                {data.map((item) => (
                    <PostContent key={item.id} source={item.source} userimg={item.userimg} UserName={item.UserName} content={item.content} Senttime={item.Senttime} contentimg={item.contentimg} />
                ))}
            </section>
        </div>
    )
}

export default RecentlyVisited
