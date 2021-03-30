import React, { useState, useEffect } from 'react'
import './Background_picture.css'

const Background_picture = (props) => {


   return(
        <section className='Background_picture'>

         
            {/* Note: the form send a POST request to /post_background_picture.

            background picture setting: Take the following HTML form that allows users to upload files to the server as part of the POST request. 
            Note that the form tag has an addition attribute, enctype that must be included for forms with file uploads.
            Note also the optional multiple attribute that allows the user to upload multiple files, if desired. I am not using multiple attribute here*/}

            <form className="form" action="/post_background_picture" method="POST" enctype="multipart/form-data">
                <input className="form" id="choose_file" name="background_picture" type="file" required /> {/*form validation on front-end to make sure some file is uploaded before submit*/}
               <br></br>
                <input className="form"  id="form_submit"  type="submit" value="Submit" />

            </form>

        </section>

   )

}

export default Background_picture