import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PostContent from '../auxiliary/PostContent'
import './Recommended.css'
import { useHistory } from 'react-router-dom'

const Recommended = (props) => {
    const [data, setData] = useState([])
    let history = useHistory()
    // the following side-effect will be called once upon initial render
    useEffect(() => {
        axios('/api_recommended')
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
        <div className='Recommended'>
            <section className='main-content'>
                {data.map((item) => (
                    <PostContent key={item.id} like_switch = {item.like_switch} source={item.source} userimg={item.userimg} UserName={item.UserName} content={item.content} Senttime={item.senttime} contentimg={item.contentimg} />
                ))}
            </section>
        </div>
    )
}

export default Recommended
