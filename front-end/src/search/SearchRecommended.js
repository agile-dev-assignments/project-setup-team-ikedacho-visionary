import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './SearchRecommended.css'
import { Link } from 'react-router-dom'

const SearchRecommended = (props) => {
    const [data, setData] = useState([])

    // the following side-effect will be called once upon initial render
    useEffect(() => {
        //https://my.api.mockaroo.com/search_recommended.json?key=2d6d6d60
        console.log('fetching recommended topics for search page')

        axios('/api_search_recommended')
            .then((response) => {
                // extract the data from the server response
                setData(response.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, []) // only run it once!

    console.log(setData)

    return (
        <div className='SearchRecommended'>
            <section>
                {data.map((item) => (
                    <div className='search_recommend_content' onClick={() => (window.location.href = '/searchResult')}>
                        <p className='search_recommend_p'>{item.topic}</p>
                        <p>🔥</p>
                    </div>
                ))}
            </section>
        </div>
    )
}

export default SearchRecommended
