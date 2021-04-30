import React, { useState, useEffect } from 'react'
import './Browse.css'
import { Link } from 'react-router-dom'

const Browse = (props) => {
    return (
        <div className='Browse'>
            <div className='block'>
                <Link
                    to={{
                        pathname: '/friend_profile',
                        state: {
                            UserName: props.UserName,
                            userimg: props.userimg,
                        },
                    }}
                >
                    <img className='userimg' src={props.userimg} />
                </Link>

                <div className='Text'>
                    <strong className='username'>{props.UserName}</strong>
                    <p className='browse_date'> Viewed at {new Date(props.viewdate).toLocaleString()}</p>
                    <p className='content'>{props.content}</p>
                </div>
            </div>
            {/* <div className='imgs'>
                {props.contentimgs.map((item) => (
                    <img className='img' src={item} alt='' />
                ))}
            </div> */}
            <img className="" src={props.contentimg}/>
        </div>
    )
}

export default Browse
