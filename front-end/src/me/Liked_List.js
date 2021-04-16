import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Liked from './Liked'


const Liked_List = (props) => {
    // start a state variable with a blank array
    const [data, setData] = useState([])

    useEffect(() => {
        axios
            .get('/api_liked_history', {
            params: {
                /* INTENTIONALLY ADDED AS BLANK BY XINYU-BOT FOR POTENTIAL FUTURE NEED */
            }
            })
            .then((response) => {
                setData(response.data)
            })
            .catch((err) => {
                console.error(err)
            })
    }, [])

    return (
        <div className="Liked_List">
            <Link to={'/me'}>
                <h1 id="back">Back</h1>
            </Link>
            <h1 id='title'>Liked Content</h1>
            
            <section className="Liked_List">
                {data.map((item) => (

                    <Liked key={item.id} 
                           source = {item.source} 
                           userimg = {item.userimg}
                           UserName = {item.UserName}
                           content = {item.content}
                           Senttime = {item.Senttime} 
                           contentimg = {item.contentimg} />

                ))}
            </section>
        </div>
    )
}

export default Liked_List
