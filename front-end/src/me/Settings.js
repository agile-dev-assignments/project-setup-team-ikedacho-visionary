import React from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from "react-router-dom"
import './Settings.css'

const Settings = (props) => {

    const history = useHistory()
    const toAbout = () => { 
        let path = '/about' 
        history.push(path)
    }

    return (
        <div className='Settings'>
            <div className='Settings_title'>
                <Link to='/Me' id='Settings_back_to_Me'>
                    Back
                </Link>
                <h2 className='Settings_page_title'>Settings</h2>
            </div>

            <div className='option_list'>
                <p
                    className='option_list'
                    id='about_ozone'
                    onClick={toAbout.bind()}
                >
                    About O-zone
                </p>
                <p
                    className='option_list'
                    id='log_out'
                    onClick={() => {
                        alert('Logged Out')
                    }}
                >
                    Log Out Current Account
                </p>
            </div>
        </div>
    )
}

// make this function available to be imported into another module
export default Settings
