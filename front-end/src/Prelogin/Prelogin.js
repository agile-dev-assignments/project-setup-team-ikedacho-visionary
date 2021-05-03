import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PostContentPrelogin from '../auxiliary/PostContent_prelogin'
import './Prelogin.css'

const Prelogin = (props) => {
    const [data, setData] = useState([])

    // the following side-effect will be called once upon initial render
    useEffect(() => {
        axios('/api_getprelogin')
            .then((response) => {
                setData(response.data)
                console.log(response.data)
            })
            .catch((err) => {})
    }, []) // only run it once!

    return (
        <div className='Prelogin'>
            <section className='main-content'>
                {data.map((item) => (
                    <PostContentPrelogin
                        key={item.index}
                        source={item.source}
                        userimg={item.userimg}
                        UserName={item.UserName}
                        content={item.content}
                        Senttime={item.senttime}
                        contentimg={item.contentimg}
                    />
                ))}
            </section>
        </div>
    )
}

export default Prelogin
