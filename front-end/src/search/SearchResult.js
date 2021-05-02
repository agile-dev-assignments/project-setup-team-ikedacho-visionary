import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './SearchResult.css'
import { Link, useLocation } from 'react-router-dom'
import PostContent from '../auxiliary/PostContent'

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

const SearchResult = (props) => {
    const [data, setData] = useState([])
    const query = useQuery()

    // the following side-effect will be called once upon initial render
    useEffect(() => {
        axios
            .get('/api_search_result', {
                params: {
                    searchQuery: query.get('s'),
                },
            })
            .then((response) => {
                // extract the data from the server response
                setData(response.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, []) // only run it once!

    return (
        <div className='searchResult'>
            <div className='subtitle'>
                <Link className='back_button' to={'/Search'}>
                    <span id='back'>Back</span>
                </Link>

                <span>Search Result</span>
            </div>
            <section>
                {data.map((item) => (
                    <PostContent key={item.id} source={item.source} userimg={item.userimg} UserName={item.UserName} content={item.content} Senttime={item.senttime} contentimg={item.contentimg} />
                ))}
            </section>
        </div>
    )
}

export default SearchResult
