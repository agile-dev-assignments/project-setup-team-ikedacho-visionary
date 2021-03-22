import './Search.css'
import React, { useState } from 'react'
import SearchBar from './SearchBar'
import SearchRecommended from './SearchRecommended'
import Trending from './Trending'

const Search = (props) => {
    const { search } = window.location;
    const query = new URLSearchParams(search).get('s');
    const [searchQuery, setSearchQuery] = useState(query || '');

    return (
        <div className = "Search">
            <h1>Search Page here</h1>
            <search className = "main-content">
                <SearchBar 
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />
                    
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