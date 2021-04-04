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
            <button id='homenav_button' >
                <SortDown color='black' size={17} onClick={_setShow}/>
               
                <div className="post-checkbox" style={{display: show ? "block" : "none"}}>
                
                <form className="form" action="/post_home" method="POST" >
                    <label><input name="selected_social_media" value="O-Zone" type="checkbox"/><p>O-Zone</p></label>
                    <label><input name="selected_social_media" value="Facebook"  type="checkbox"/><p>Facebook</p></label>
                    <label><input name="selected_social_media" value="Twitter"  type="checkbox"/><p>Twitter</p></label>
                    <label><input name="selected_social_media" value="Instagram"  type="checkbox"/><p>Instagram</p></label>
                    <input type="submit" value="See results"/>
                </form>
                </div>
            </button>

          
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
