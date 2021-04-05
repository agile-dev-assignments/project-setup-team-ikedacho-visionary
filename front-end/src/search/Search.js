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
            <h1 className="top_title">Search Page here</h1>
            <search className = "main_content">
                <SearchBar 
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />
            </search>

            <recommend>
                <p class="subtitle">Recommended For You</p>
                <SearchRecommended />

            </recommend>

            <trending>
                <p class="subtitle">Trending</p>
                <Trending />
            </trending>
        </div>
    );
}

export default Search;