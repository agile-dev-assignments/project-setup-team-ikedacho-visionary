import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Trending.css'

const Trending = (props) => {
    const [data, setData] = useState([])

    // the following side-effect will be called once upon initial render
    useEffect(() => {

        //https://my.api.mockaroo.com/trending.json?key=2d6d6d60
        axios('api_trending')
            .then((response) => {
                // extract the data from the server response
                setData(response.data)
            })
            .catch((err) => {
                console.log(err)
            })
        }, []) // only run it once!

    return (
        <div className = "Trending">
            <section>
                {data.map((item) => (
                    
                    <p  onClick={() => window.location.href = '/searchResult'}>{item.topic}</p>
                ))}
            </section>

        </div>
    );
}

export default Trending;