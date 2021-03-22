import { useHistory } from 'react-router-dom';
import React from 'react'
// import SearchResult from './SearchResult'
import './SearchBar.css'

const SearchBar = ({ searchQuery, setSearchQuery }) => {
    const history = useHistory();

    const onSubmit = e => {
        history.push(`?s=${searchQuery}`)
        e.preventDefault()
    };

    return (
        /*
        <form action = "/" method = "get">
            <input
                type = "text"
                id = "header-search"
                placeholder = "What do you want? "
                name = "s" 
            />

            <button type = "submit"  onSubmit={onSubmit}>Search</button>
        </form>
        */
        <>
            <input
            type = "text"
            id = "header-search"
            placeholder = "What do you want? "
            name = "s" />
            <button type = "submit" onClick={() => window.location.href = '/searchResult'}>Search</button>
        </>
    );
}    

export default SearchBar;