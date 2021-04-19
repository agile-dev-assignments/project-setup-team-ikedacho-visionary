import React from 'react'
import { Link } from 'react-router-dom'
import './Settings.css'

const Settings = (props) => {
    // console.log(props);

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
                    id='accounts'
                    onClick={() => {
                        alert('Accounts')
                    }}
                >
                    Accounts
                </p>
                <p
                    className='option_list'
                    id='account_security'
                    onClick={() => {
                        alert('Account Security')
                    }}
                >
                    Account Security
                </p>

                <p
                    className='option_list'
                    id='privacy'
                    onClick={() => {
                        alert('Privacy')
                    }}
                >
                    Privacy
                </p>
                <p
                    className='option_list'
                    id='notification_settings'
                    onClick={() => {
                        alert('Notification Settings')
                    }}
                >
                    Notification Settings
                </p>
                <p
                    className='option_list'
                    id='clear_cache'
                    onClick={() => {
                        alert('Clear Cache')
                    }}
                >
                    Clear Cache
                </p>

                <p
                    className='option_list'
                    id='customer_service_center'
                    onClick={() => {
                        alert('Customer Service Center')
                    }}
                >
                    Customer Service Center
                </p>
                <p
                    className='option_list'
                    id='about_ozone'
                    onClick={() => {
                        alert('About Us')
                    }}
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
