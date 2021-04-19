import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Browse from '../auxiliary/Browse'
import './Browse_History.css'
import axios from 'axios'
const Browse_History = (props) => {
    const [PostData, setPostData] = useState([])

    useEffect(() => {
        axios
            .get('/api_browse')
            .then((response) => {
                // extract the data from the server response
                setPostData(response.data)
            })
            .catch((err) => {
                console.error(err)
            })
    }, []) // only run it once!

    console.log(PostData)

    return (
        <div className='Browse_History'>
            <header>
                <Link to='/Me'>
                    <h3>back</h3>
                </Link>
                <h3>Browse History</h3>
                <p></p>
            </header>
            <div className='Browse_List'>
                {PostData.map(
                    (item) => (console.log('rendering'), (<Browse viewdate={item.viewdate.slice(0,10)} UserName={item.UserName} userimg={item.userimg} content={item.content} contentimgs={item.contentimgs} />))
                )}
            </div>
        </div>
    )
}

export default Browse_History
