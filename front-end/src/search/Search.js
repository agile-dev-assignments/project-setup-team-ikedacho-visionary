import './Search.css'
import React, { useState, useEffect } from 'react'
import searchResult from './searchResult'
import axios from 'axios'


const Search = (props) => {

    return (
        <div className = "Search">
            <h2>Search Page here</h2>
            <search className = "main-content">


            </search>

            <recommend>
                <p>Recommended For You</p>

            </recommend>

            <trending>

            </trending>
        </div>
    );
}

export default Search;