import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Trending.css'

const Trending = (props) => {
    const [data, setData] = useState([])

    // the following side-effect will be called once upon initial render
    useEffect(() => {

        axios('https://my.api.mockaroo.com/trending.json?key=2d6d6d60')
            .then((response) => {
                // extract the data from the server response
                setData(response.data)
            })
            .catch((err) => {
                const backupData = [{"topic":"hot topic #699"},{"topic":"hot topic #0"},{"topic":"hot topic #3"},{"topic":"hot topic #422"},{"topic":"hot topic #78"},{"topic":"hot topic #34"},{"topic":"hot topic #2"},{"topic":"hot topic #435"},{"topic":"hot topic #3"},{"topic":"hot topic #94"}
                ]
                setData(backupData)
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