import React from 'react'
import './Background_picture.css'
import { useHistory } from 'react-router-dom'
const Background_picture = (props) => {
    let history = useHistory()

    const goTOPreviousPath2 = (e) => {
        history.goBack()
        setTimeout(() => {
            window.location.href = '/my_profile'
        }, 100)
    }

    return (
        <section className='Background_picture'>
            {/* Note: the form send a POST request to /post_background_picture.

            background picture setting: Take the following HTML form that allows users to upload files to the server as part of the POST request. 
            Note that the form tag has an addition attribute, enctype that must be included for forms with file uploads.
            Note also the optional multiple attribute that allows the user to upload multiple files, if desired. I am not using multiple attribute here*/}

            <form className='form' action='/post_background_picture' method='POST' enctype='multipart/form-data'>
                <input className='form' id='choose_file' name='background_picture' type='file' required /> {/*form validation on front-end to make sure some file is uploaded before submit*/}
                <br></br>
                <input
                    className='form'
                    id='form_submit'
                    type='submit'
                    value='Submit'
                    onClick={(e) => {
                        goTOPreviousPath2(e)
                    }}
                />
            </form>
        </section>
    )
}

export default Background_picture
