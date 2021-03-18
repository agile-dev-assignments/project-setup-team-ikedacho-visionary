import './Search.css'
import React, { useState, useEffect } from 'react'
// import searchResult from './SearchResult'
import SearchBar from './SearchBar'
import { Link } from 'react-router-dom'
// import axios from 'axios'
import SearchRecommended from './SearchRecommended'
import Trending from './Trending'

const Search = (props) => {
    const { search } = window.location;
    const query = new URLSearchParams(search).get('s');
    const [searchQuery, setSearchQuery] = useState(query || '');

    return (
        <div className = "Search">
            <h2>Search Page here</h2>
            <search className = "main-content">
                <SearchBar 
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />
                <Link to={'/searchResult'}> 
                    <button>Showcasing SearchResult</button>
                </Link>
                    
            </search>

            <recommend>
                <p>Recommended For You</p>
                <SearchRecommended />

            </recommend>

            <trending>
                <p>🔥Trending🔥</p>
                <Trending />
            </trending>
        </div>
    );
}

export default Search;