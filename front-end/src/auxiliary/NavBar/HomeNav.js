import React, {useState} from 'react'
import {NavLink} from 'react-router-dom'
import './HomeNav.css'
import {FileEarmarkPlus, SortDown} from "react-bootstrap-icons";

// Login page is placed here for building/inspecting purpose
// It will not appear in the Navigation bar in finalized version
const HomeNav = (props) => {
    const [show, setShow] = useState(false)

    const _setShow = () => {
        console.log(show);
        setShow(!show);
    };

    return (
        <nav className="homenav">
            <NavLink id='homenav_button' to="/" className="post">
                <SortDown color='black' size={17} onClick={_setShow}/>
                <div className="post-checkbox" style={{opacity: show ? 1 : 0}}>
                    <label><input name="post" type="checkbox"/><p>Platform A</p></label>
                    <label><input name="post" type="checkbox"/><p>Platform B</p></label>
                    <label><input name="post" type="checkbox"/><p>Platform C</p></label>
                    <label><input name="post" type="checkbox"/><p>Platform D</p></label>
                </div>
            </NavLink>
            <NavLink id='homenav_button' to="/">What's New</NavLink>
            <NavLink id='homenav_button' to="/recent">Recently Visited</NavLink>
            <NavLink id='homenav_button' to="/recommend">Recommend</NavLink>
            <NavLink id='homenav_button' to="/edit_new_post">
                <FileEarmarkPlus onClick={() => window.location.href = '/edit_new_post'} id="create_post" color='black' size={17}/>
            </NavLink>
        </nav>
    )
}

export default HomeNav
