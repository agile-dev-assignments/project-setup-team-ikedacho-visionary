import React, {useState, useEffect} from 'react'
import './Browse.css'

const Browse = (props) => {
    return (
        <div className="Browse">
            <div className="block">
                
                <img className="userimg" src={props.userimg}/>
                <div className="Text">
                    <strong className="username">{props.UserName}</strong>
                    <p className="content">{props.content}</p>
                </div>
            </div>
            <div className="imgs">
                {props.contentimgs.map((item) => (
                    <img className="img" src={item} alt=""/>
                ))}
            </div>
            {/*<img className="" src={props.contentimg}/>*/}
        </div>
    )
}


export default Browse
