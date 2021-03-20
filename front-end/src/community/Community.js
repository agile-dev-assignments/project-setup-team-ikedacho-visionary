import React from 'react';
import './Community.css'


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

            <section className = "search">
                
            </section>

            <section className = "message">
                
            </section>
        </div>
    );
}

export default Community;