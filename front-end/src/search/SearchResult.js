import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './SearchResult.css'
import { Link } from 'react-router-dom'
import PostContent from '../auxiliary/PostContent'

const SearchResult = (props) => {
    const [data, setData] = useState([])

    // the following side-effect will be called once upon initial render
    useEffect(() => {

        //'https://my.api.mockaroo.com/sr.json?key=2d6d6d60'
        axios('/api_search_result')
            .then((response) => {
                // extract the data from the server response
                setData(response.data)
            })
            .catch((err) => {
                console.log(err)
            })
        }, []) // only run it once!

    return (
        <div className = "Search">

            <Link to={'/Search'}> 
                <h1 id="back" >Back</h1>
            </Link>

            <h1>Search Result</h1>
      
            <section>
                {data.map((item) => (
                    <PostContent key={item.id}
                            source = {item.source} 
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

export default SearchResult;