import { useHistory } from 'react-router-dom'
import React from 'react'
// import SearchResult from './SearchResult'
import { Search } from 'react-bootstrap-icons'

import './SearchBar.css'

const SearchBar = ({ searchQuery, setSearchQuery }) => {
    return (
        <>
            <form action='/searchResult' method='get'>
                <input className='Search_input_search' type='text' id='header-search' placeholder='Search here' name='s' />
                <Search id='search_icon_onepage' color='grey' size={15} />
            </form>
        </>
    )
}
//<Search id='search_icon_onepage' color='grey' size={17} />
export default SearchBar
