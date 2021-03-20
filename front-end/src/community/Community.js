import React from 'react';
import './Community.css'
import { Search } from 'react-bootstrap-icons';

const Community = (props) => {

    return (
        <div className = "Community">
            <h1>Message</h1>
            <div className = "main-content">
                <div> 
                    <p id="mentions">
                        Mentions
                    </p>
                </div>
                <div> 
                    <p id="comments">
                        Comments
                    </p>
                </div>

                <div> 
                    <p id="likes">
                        Likes
                    </p>
                </div>
            </div>

            <div >
                <input id="search">
                </input>
                <Search id='search_icon' color="grey" size={17} />
                
            </div>

            <section className = "message">
                
            </section>
        </div>
    );
}

export default Community;