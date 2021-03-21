import React from 'react';
import './Me.css'
import { Link } from 'react-router-dom'


const Me = (props) => {

    return (
        <div className = "Me">
            <h2>Me Page here</h2>
            
            <div className = "Me_Setting" id = "Settings">
                <Link to = './Settings'>
                    <p>Settings</p>
                </Link>
            </div>

            <Link to = './Followers'>
                <p>Followers</p>
            </Link>

            <Link to = './Followings'>
                <p>Followings</p>
            </Link>

            <Link to = './friend_suggestion'>
                <p>Friend Suggestion</p>
            </Link>

            <Link to = './browse_history'>
                <p>Browse History</p>
            </Link>
            

            <br></br>
            <section className = "main-content">
                <p>
                    A wave loudly clashing against a long shoreline was always the second best.
                    The sky lies ahead, what with the future yet to come.
                </p>
            </section>
        </div>
    );
}

export default Me;
