import React, {useState, useEffect} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import PostContent from "../auxiliary/PostContent";
import "./Edit.css";
import { useHistory } from 'react-router-dom'

const Edit = (props) => {
    let history=useHistory();
    const goTOPreviousPath=()=>{
        history.goBack()
    }
    const [show, setShow] = useState(false)

    const _setShow = () => {
        console.log(show);
        setShow(!show);
    };

    return (
        <div className="edit">
            <header> 
                <Link onClick={goTOPreviousPath}>
                    <button>back</button>
                </Link>
                <h2>New Post</h2>
                <button onClick={goTOPreviousPath}>send</button>
            </header>

            <section className="edit-wrap">
                <textarea className="textarea" placeholder="what's on your mind?"/>

                <div className="post">
                    <span onClick={_setShow}>Post to ⬇️ </span>
                    <div className="post-checkbox" style={{ opacity : show ? 1 : 0}}>
                        <label><input name="post" type="checkbox"/>Platform A </label>
                        <label><input name="post" type="checkbox"/>Platform B</label>
                        <label><input name="post" type="checkbox"/>Platform C</label>
                        <label><input name="post" type="checkbox"/>Platform D</label>
                    </div>
                </div>

                <div className="checkbox">
                    <input type="checkbox"/>
                    <span>Post as Public</span>
                </div>

            </section>


        </div>
    );

};

export default Edit;
