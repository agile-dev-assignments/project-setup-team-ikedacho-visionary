import './about.css'
import React from 'react'
import { Link } from 'react-router-dom'

const About = (props) => {
    
    // render the page
    return (
        <>
            <Link to = '/settings' className = 'about-back'>
                Back
            </Link>
            <h2 className = 'about-title'>About Ozone</h2>
            <div className = 'about-body'>
                <span>
                    Ozone is an aggregation of social media platforms presented by Team Ikedacho-Visionary. 
                    <br></br><br></br>
                </span>
                <span>
                    If you are interested in the details about our project, including the workflow design, 
                    specific implementation of some features, questions, and inquiries, 
                    or if you have any suggestions and even contributions, please 
                </span>
                <a href = 'https://github.com/agile-dev-assignments/project-setup-team-ikedacho-visionary/'> contact us</a>
            </div>
        </>
    )
}

export default About
