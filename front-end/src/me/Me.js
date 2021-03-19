import React from 'react';
import './Me.css'
import { Link } from 'react-router-dom'


const Me = (props) => {

    return (
        <div className = "Me">
            <h2>Me Page here</h2>
            <Link to = './Followers'>
                <p>Followers</p>
            </Link>

            <Link to = './Followings'>
                <p>Followings</p>
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