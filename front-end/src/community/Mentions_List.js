import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import './Mentions_List.css'
import Mentions from "./Mentions";

const Mentions_List = (props) => {
    // start a state varaible with a blank array
    const [data, setData] = useState([])

    // the following side-effect will be called once upon initial render
    useEffect(() => {
        
        // 'https://my.api.mockaroo.com/mentioned_history.json?key=49286830'
        axios
            .get("/api_being_mentioned", {
                params: {
                    /* INTENTIONALLY LEFT AS BLANK BY XINYU-BOT */
                }
            })
            .then((response) => {
                // extract the data from the server response
                setData(response.data)
            })
            .catch((err) => {
                /* 
                THIS CODE SEGMENT IS ENTIRELY REMOVED BY XINYU-BOT INTENTIONALLY
                The original code is bad at readablity and just backup data
                Backup data has been moved to back-end
                */
            })
    }, []) // only run it once!

    return (
        <div className="Mentions_List">
            <Link to={'/community'}>
                <h1 id="back">Back</h1>
            </Link>

            <h1 id='title'>Mentions</h1>

            <section className="Mentions_List">
                {data.map((item) => (
                    <Mentions 
                        key={item.id} 
                        details={item}/>
                ))}

            </section>
        </div>
    )
}

export default Mentions_List
