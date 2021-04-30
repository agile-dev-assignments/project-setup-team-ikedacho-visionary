import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {BrowserRouter as Router,Link} from 'react-router-dom'
import './Trending.css'
import { useHistory } from 'react-router-dom'
const Trending = (props) => {
    const [data, setData] = useState([])
    let history = useHistory()
    // the following side-effect will be called once upon initial render
    useEffect(() => {
        //https://my.api.mockaroo.com/trending.json?key=2d6d6d60
        axios('api_trending')
            .then((response) => {
                // extract the data from the server response
                setData(response.data)
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
        <div className='Trending'>
            <section>
                {data.map((item) => (
                    <div className='trending_content'>
                        <Link className='trending_p' to={{pathname: '/searchResult',search:'?s='+item.topic}}>{item.topic}</Link>
                        <p>🔥</p>
                    </div>
                ))}
            </section>
        </div>
    )
}

export default Trending
