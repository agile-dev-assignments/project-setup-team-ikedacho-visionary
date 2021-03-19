import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PostContent from '../auxiliary/PostContent'
import './RecentlyVisited.css'

const RecentlyVisited = (props) => {
    const [data, setData] = useState([])

    // the following side-effect will be called once upon initial render
    useEffect(() => {

        axios('https://my.api.mockaroo.com/sr.json?key=2d6d6d60')
            .then((response) => {
                // extract the data from the server response
                setData(response.data)
            })
            .catch((err) => {
                const backupData = [
                ]
                setData(backupData)
            })
        }, []) // only run it once!


    return (
        <div className = "WhatsNew">
            <h2>WhatsNew Page here</h2>
            <section className = "main-content">
                {data.map((item) => (
                        <PostContent source = {item.source} 
                                userimg = {item.userimg}
                                UserName = {item.UserName}
                                content = {item.content}
                                Senttime = {item.Senttime} 
                                contentimg = {item.contentimg} />
                    ))} 
            </section>
        </div>
    );
}

export default RecentlyVisited;