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
    //at least one field is required
    function anyvalidate(e) {

        //form validation: select at least one 
        let checkBox1 = document.getElementById("platform_label1");
        let checkBox2 = document.getElementById("platform_label2");
        let checkBox3 = document.getElementById("platform_label3");
        let checkBox4 = document.getElementById("platform_label4");
        let checkBox5 = document.getElementById("platform_label5");
        if (checkBox1.checked === false && checkBox2.checked === false&&checkBox3.checked === false &&checkBox4.checked === false && checkBox5.checked ===false){
            alert( "You need to select at least one platform to see results" );
            e.preventDefault()
        
        }


        
       
    }

    return (
        <nav className="homenav">
            <button id='homenav_button' >
                <SortDown color='black' size={17} onClick={_setShow}/>
               
                <div className="post-checkbox" style={{display: show ? "block" : "none"}}>
                
                <form name="form" onSubmit={e=>{anyvalidate(e)}} action="/post_home" method="POST" >
                    <label id="platform_label"><input id="platform_label1" name="selected_social_media" value="All" type="checkbox"/><p>All</p></label>

                    <label id="platform_label"><input id="platform_label2" name="selected_social_media" value="O-Zone" type="checkbox"/><p>O-Zone</p></label>
                    <label id="platform_label"><input id="platform_label3" name="selected_social_media" value="Facebook"  type="checkbox"/><p>Facebook</p></label>
                    <label id="platform_label"><input id="platform_label4" name="selected_social_media" value="Twitter"  type="checkbox"/><p>Twitter</p></label>
                    <label id="platform_label"><input id="platform_label5" name="selected_social_media" value="Instagram"  type="checkbox"/><p>Instagram</p></label>
                    <input id="submit_homenav" type="submit" value="See results"  />
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
