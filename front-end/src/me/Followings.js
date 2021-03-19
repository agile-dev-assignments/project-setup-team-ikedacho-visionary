import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Followings.css'
import { Link } from 'react-router-dom'
import NameTag from '../auxiliary/NameTag'
import './Followings.css'

const Followings = (props) => {
    const [data, setData] = useState([])

    useEffect(() => {
        
        axios('https://my.api.mockaroo.com/followings.json?key=2d6d6d60')
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
        <div className = "Followings">
            <h2>Followings Page here</h2>
            <Link to = '/Me'>
                <button>back</button>
            </Link>
            <section className = "main-content">
                <p>
                    {data.map((item) => (
                        <NameTag img = {item.img}
                                 UserName = {item.UserName}
                                 bio = {item.bio}
                                 action = {item.action} />
                    ))}
                </p>
            </section>
        </div>
    );
}

export default Followings;