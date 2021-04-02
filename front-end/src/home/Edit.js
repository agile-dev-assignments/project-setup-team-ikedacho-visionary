import React, {useState} from "react";
import {Link} from "react-router-dom";
import "./Edit.css";
import { useHistory } from 'react-router-dom'
import {useEffect } from 'react'
import axios from 'axios'
import Post_picture from '../me/Post_picture'

const Edit = (props) => {
    const [state, setState] = useState({
        showComment: false
    })

    const _showComment = () => {
        let cur = state.showComment
        setState({
          showComment: !cur
        });
    };

    const [show, setShow] = useState(false)
    //represnet if the send button is clicked. false: not clicked. true: clicked
    const [send, setSend]=  useState(false)
    const [post_text, setPost_text]=  useState("defualt text")


    let history=useHistory();

    const goTOPreviousPath=()=>{
        history.goBack()
    }


    const goTOPreviousPath2=()=>{
        setSend(!send)
        setPost_text('my post text')
        console.log("send:",send)
        console.log("post_text:",post_text)
        document.getElementById("myTextarea").value = post_text;
        console.log(post_text)

        axios
            .get('/get_edit', {
                //send along the post_text user typed 
               
                params: {
                  post_text: post_text,
             
                }
            })
        history.goBack()
        
        
    }



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
                <button onClick={goTOPreviousPath2}>send</button>
            </header>

            <section className="edit-wrap">
                <textarea id="myTextarea" onInput = {e => setPost_text(e.target.value)}/>
                
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>

                <button className = "Commentbutton" onClick = {_showComment.bind()}>Upload picture</button>

                {state.showComment && (
                <>
                    {<Post_picture />
                    }
                </>
                )}




                <div className="post">
                    <span onClick={_setShow}>Post to ▼️ </span>
                    <div className="post-checkbox" style={{ opacity : show ? 1 : 0}}>
                        <label><input name="post" type="checkbox"/>Platform A </label>
                        <label><input name="post" type="checkbox"/>Platform B</label>
                        <label><input name="post" type="checkbox"/>Platform C</label>
                        <label><input name="post" type="checkbox"/>Platform D</label>
                    </div>
                </div>

                <div className="checkbox">
                    <input type="checkbox"/>
                    <span>Post as Pravite</span>
                </div>

            </section>


        </div>
    );

};

export default Edit;
