import React, { useState, useEffect } from 'react'
import './MyProfile.css'
import { Link } from 'react-router-dom'
import { ChevronLeft } from 'react-bootstrap-icons';
import { FileEarmarkPlus } from 'react-bootstrap-icons';
import axios from 'axios'
import PostContent from '../auxiliary/PostContent'
import { useHistory } from 'react-router-dom'

const MyProfile = (props) => {
    /*
    const handleClick=()=>{
        console.log('clicked!')
        setPlatform_name(document.getElementById('facebook-icon').getAttribute("value") )

    }
  */
    const handleClick=(e)=>{//e is the id of the element clicked

        //console.log("before:",document.getElementById(e).style.border)
        //set border color. If clicked, change the border style. if clicked again, change the border style back.
        //document.getElementById(e).style.border = (document.getElementById(e).style.border==="")? "1px solid #9b51b8": ""; //the default value of border is "", not none.
        //console.log("after:",document.getElementById(e).style.border)
        
        /*
        //allow multi-selection: if the clicked_platform is not in the array, then add it to the array. If it already in the array, the remove it from the array.
        if (platform_name_array.includes(e)){
            platform_name_array = platform_name_array.filter(element=> element!==e)
            console.log(`array after delete ${e}:`,platform_name_array)
        }
        else{
            platform_name_array.push(e)
            console.log(`array after add ${e}:`,platform_name_array)
        }

        setPlatform_name_array(platform_name_array);
        console.log("setPlatform",platform_name_array)
        */
        //once clicked the platfrom, its border style changes. and only one platform have border color

       
        //only allow one selection. select one platform, then only show post from that platform. if e="select_all_text", then show posts from all platfrom
        if(e!=="select_all_text"){
            setPlatform_name_array(e);
        }
        else{
            setPlatform_name_array(["facebook",'instagram','twitter'])
        }   
    }


    let history=useHistory();
    const goTOPreviousPath=()=>{
        history.goBack()
    }

    //set user_info
    const [user_info,setUser_info] = useState([])
    //set post_data
    const [post_data,setPost_data] = useState([])
    let [platform_name_array, setPlatform_name_array] = useState([]);
   

    // the following side-effect will be called once upon initial render
    useEffect(() => {
        //request data from server once user open my_profile page
        console.log('fetching response from server')
        axios.get('/my_profile', {
            params: {
                platform_name_array: platform_name_array
            }
        })
        //deal with the response sent back from server
        .then((response) => {
            // response.data extract the data from the server response
            //console.log("response.data:", response.data)
            console.log("response:", response.data)
            setUser_info(response.data.user_info)
            setPost_data(response.data.post_data)
        })
        .catch((err) => {
            console.log("error: cannot fetch response from server")
            console.log(err)
        })//end of catch,axios
    }, [platform_name_array]) // render everytime platform_name header changes.

    return (
        <div className = "MyProfile">
            <section id='header'>
                <Link to = {'/me'}> 
                    <ChevronLeft id="back" color='black' size={17}/> 
                </Link>
                
                <h1>Me</h1>
               

                <Link to = {'/edit_new_post'}>
                    <FileEarmarkPlus id="create_post" color='black' size={17}/> 
                </Link>
            </section>
           
            <section id='main_container1'>

                {/* Note: the form send a POST request to /my_profile.
                    background picture setting: Take the following HTML form that allows users to upload files to the server as part of the POST request.  
                    Note that the form tag has an addition attribute, enctype that must be included for forms with file uploads.
                    Note also the optional multiple attribute that allows the user to upload multiple files, if desired. I am not using multiple attribute here*/}
                <form className="form" action="/my_profile" method="POST" enctype="multipart/form-data">
                    <input className="form" id="choose_file" name="background_picture" type="file" />
                    <br></br>
                    <input className="form"  id="form_submit"  type="submit" value="upload picture" />
                </form>
                
                <img class='inline-block' id='background_picture' src={`${user_info.background_picture}`}/> {/* src is the url to request and find static file in public/ folder. don't use /static/url !!!!!!! it cause error*/}


                <div id="overview">
                    <p id='message_text' > 

                        <img class='inline-block' id='avatar' src={user_info.user_photo}/> 
                        <span class='inline-block' id='username'>{user_info.user_name}</span>
                        <br></br>
                       

                        <span id='post_follow'>
                        <Link id='button' to = '/my_profile'>
                        {user_info.post_number}
                            <br></br>
                            Posts
                        </Link>

                        <Link id='button' to = '/followers'>
                        {user_info.follower_number}
                            <br></br>

                            Followers
                        </Link>
                        <Link id='button' to = '/followings'>
                        {user_info.following_number}
                            <br></br>
                            Following
                        </Link>
                        </span>

                        <span id='bio'>{user_info.bio}</span>
                    </p>

                </div >
            </section>

            
            <section>
               
            <h1>Linked Social Media</h1>  
            <div  id="main_container3">
                <div className='icon' id='select_all' onClick={e=> { handleClick(e.target.id) }} >  {/* target is the element clicked */}
                    <span id='select_all_text' >All</span>
                </div>

                <div className='icon' id='facebook' onClick={e=> { handleClick(e.target.id) }} >  {/* target is the element clicked */}
                    <img id='facebook' src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMzAiIGhlaWdodD0iMzAiCnZpZXdCb3g9IjAgMCAxNzIgMTcyIgpzdHlsZT0iIGZpbGw6I2ZmZmZmZjsiPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0wLDE3MnYtMTcyaDE3MnYxNzJ6IiBmaWxsPSJub25lIj48L3BhdGg+PGcgZmlsbD0iI2ZmZmZmZiI+PHBhdGggZD0iTTEyNS41OTU4Myw2NC41aC0yNS4yNjI1di0xNC4zMzMzM2MwLC03LjM5NiAwLjYwMiwtMTIuMDU0MzMgMTEuMjAxNSwtMTIuMDU0MzNoMTMuMzg3MzN2LTIyLjc5Yy02LjUxNDUsLTAuNjczNjcgLTEzLjA2NDgzLC0xLjAwMzMzIC0xOS42MjIzMywtMC45ODljLTE5LjQ0MzE3LDAgLTMzLjYzMzE3LDExLjg3NTE3IC0zMy42MzMxNywzMy42NzYxN3YxNi40OTA1aC0yMS41djI4LjY2NjY3bDIxLjUsLTAuMDA3MTd2NjQuNTA3MTdoMjguNjY2Njd2LTY0LjUyMTVsMjEuOTczLC0wLjAwNzE3eiI+PC9wYXRoPjwvZz48L2c+PC9zdmc+"/>
                        
                </div>

                <div className='icon' id='twitter' onClick={e=> {handleClick(e.target.id)}} >
                    <img id='twitter'  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMzAiIGhlaWdodD0iMzAiCnZpZXdCb3g9IjAgMCAxNzIgMTcyIgpzdHlsZT0iIGZpbGw6I2ZmZmZmZjsiPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0wLDE3MnYtMTcyaDE3MnYxNzJ6IiBmaWxsPSJub25lIj48L3BhdGg+PGcgZmlsbD0iI2ZmZmZmZiI+PHBhdGggZD0iTTE3MiwzMC44MjIyNmMtNi40Mzg4LDIuODU1NDcgLTEyLjkwNTYsNS4wMTEwNyAtMjAuMDcyMjYsNS43Mzg5NGM3LjE2NjY3LC00LjMxMTIgMTIuOTA1NiwtMTEuNDc3ODcgMTUuNzYxMDcsLTE5LjM3MjRjLTcuMTY2NjcsNC4zMTExOSAtMTQuMzMzMzMsNy4xNjY2NyAtMjIuMTk5ODgsOC42MjI0Yy03LjE2NjY3LC03LjE2NjY3IC0xNi40ODg5MywtMTEuNDc3ODcgLTI2LjUxMTA2LC0xMS40Nzc4N2MtMTkuMzcyNCwwIC0zNS4xMzM0NywxNS43NjEwNyAtMzUuMTMzNDcsMzUuMTA1NDdjMCwyLjg4MzQ2IDAsNS43Mzg5MyAwLjcyNzg2LDcuODk0NTNjLTI5LjM5NDUzLC0xLjQyNzc0IC01NS4xNzc3MywtMTUuMDYxMTkgLTcyLjM5NDUzLC0zNi41NjExOWMtMy41ODMzMyw1LjAzOTA2IC01LjAxMTA3LDExLjQ3Nzg2IC01LjAxMTA3LDE3LjkxNjY3YzAsMTIuMjA1NzMgNi40Mzg4MSwyMi45NTU3MyAxNS43NjEwNywyOS4zOTQ1M2MtNS43Mzg5MywtMC43Mjc4NiAtMTEuNDQ5ODcsLTIuMTU1NiAtMTUuNzYxMDcsLTQuMzExMTljMCwwIDAsMCAwLDAuNzI3ODZjMCwxNy4xODg4MSAxMi4xNzc3NCwzMS41MjIxNCAyNy45Mzg4MSwzNC40MDU2Yy0yLjg1NTQ3LDAuNjk5ODggLTUuNzEwOTQsMS40Mjc3NCAtOS4yOTQyNywxLjQyNzc0Yy0yLjE1NTYsMCAtNC4zMTEyLDAgLTYuNDY2OCwtMC43Mjc4NmM0LjMxMTE5LDE0LjMzMzMzIDE3LjIxNjgsMjQuMzgzNDYgMzIuOTc3ODYsMjQuMzgzNDZjLTEyLjE3NzczLDkuMzIyMjcgLTI3LjIzODkzLDE1LjAzMzIxIC00My43Mjc4NiwxNS4wMzMyMWMtMi44NTU0NywwIC01LjczODkzLDAgLTguNTk0NCwtMC42OTk4OGMxNS43NjEwNywxMC4wMjIxNCAzNC40MDU2LDE1Ljc2MTA3IDUzLjc1LDE1Ljc2MTA3YzY1LjIyNzg3LDAgMTAwLjMzMzMzLC01My43NSAxMDAuMzMzMzMsLTEwMC4zMzMzM2MwLC0xLjQyNzc0IDAsLTIuODU1NDcgMCwtNC4zMTExOWM3LjE2NjY3LC01LjAxMTA3IDEyLjkwNTYsLTExLjQ0OTg4IDE3LjkxNjY3LC0xOC42MTY1NCI+PC9wYXRoPjwvZz48L2c+PC9zdmc+" />
                </div>

                <div class='icon' id='instagram' onClick={e=> {handleClick(e.target.id)}} >
                    <img id='instagram'   src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMzAiIGhlaWdodD0iMzAiCnZpZXdCb3g9IjAgMCAxNzIgMTcyIgpzdHlsZT0iIGZpbGw6I2ZmZmZmZjsiPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0wLDE3MnYtMTcyaDE3MnYxNzJ6IiBmaWxsPSJub25lIj48L3BhdGg+PGcgZmlsbD0iI2ZmZmZmZiI+PHBhdGggZD0iTTQ5LjkyNTQ4LDBjLTI3LjQ5NTE5LDAgLTQ5LjkyNTQ4LDIyLjQzMDI5IC00OS45MjU0OCw0OS45MjU0OHY3Mi4xNDkwNGMwLDI3LjQ5NTE5IDIyLjQzMDI5LDQ5LjkyNTQ4IDQ5LjkyNTQ4LDQ5LjkyNTQ4aDcyLjE0OTA0YzI3LjQ5NTE5LDAgNDkuOTI1NDgsLTIyLjQzMDI5IDQ5LjkyNTQ4LC00OS45MjU0OHYtNzIuMTQ5MDRjMCwtMjcuNDk1MTkgLTIyLjQzMDI5LC00OS45MjU0OCAtNDkuOTI1NDgsLTQ5LjkyNTQ4ek00OS45MjU0OCwxMy4yMzA3N2g3Mi4xNDkwNGMyMC4zMzcxNCwwIDM2LjY5NDcxLDE2LjMzMTczIDM2LjY5NDcxLDM2LjY5NDcxdjcyLjE0OTA0YzAsMjAuMzM3MTQgLTE2LjMzMTczLDM2LjY5NDcxIC0zNi42OTQ3MSwzNi42OTQ3MWgtNzIuMTQ5MDRjLTIwLjMzNzE0LDAgLTM2LjY5NDcxLC0xNi4zMzE3MyAtMzYuNjk0NzEsLTM2LjY5NDcxdi03Mi4xNDkwNGMwLC0yMC4zMzcxNCAxNi4zMzE3MywtMzYuNjk0NzEgMzYuNjk0NzEsLTM2LjY5NDcxek0xMzUuNjE1MzgsMjYuNDYxNTRjLTUuNDc4MzcsMCAtOS45MjMwOCw0LjQ0NDcxIC05LjkyMzA4LDkuOTIzMDhjMCw1LjQ3ODM3IDQuNDQ0NzEsOS45MjMwOCA5LjkyMzA4LDkuOTIzMDhjNS40NzgzNywwIDkuOTIzMDgsLTQuNDQ0NzEgOS45MjMwOCwtOS45MjMwOGMwLC01LjQ3ODM3IC00LjQ0NDcxLC05LjkyMzA4IC05LjkyMzA4LC05LjkyMzA4ek04NiwzOS42OTIzMWMtMjUuNTA1NDEsMCAtNDYuMzA3NjksMjAuODAyMjggLTQ2LjMwNzY5LDQ2LjMwNzY5YzAsMjUuNTA1NDEgMjAuODAyMjgsNDYuMzA3NjkgNDYuMzA3NjksNDYuMzA3NjljMjUuNTA1NDEsMCA0Ni4zMDc2OSwtMjAuODAyMjggNDYuMzA3NjksLTQ2LjMwNzY5YzAsLTI1LjUwNTQxIC0yMC44MDIyOCwtNDYuMzA3NjkgLTQ2LjMwNzY5LC00Ni4zMDc2OXpNODYsNTIuOTIzMDhjMTguMzQ3MzYsMCAzMy4wNzY5MiwxNC43Mjk1NyAzMy4wNzY5MiwzMy4wNzY5MmMwLDE4LjM0NzM2IC0xNC43Mjk1NiwzMy4wNzY5MiAtMzMuMDc2OTIsMzMuMDc2OTJjLTE4LjM0NzM1LDAgLTMzLjA3NjkyLC0xNC43Mjk1NiAtMzMuMDc2OTIsLTMzLjA3NjkyYzAsLTE4LjM0NzM1IDE0LjcyOTU3LC0zMy4wNzY5MiAzMy4wNzY5MiwtMzMuMDc2OTJ6Ij48L3BhdGg+PC9nPjwvZz48L3N2Zz4="/>
                </div>
            </div>
            </section>

            <section>
            <section className = "main-content4">
                    {post_data.map((item) => (
                            <PostContent 
                                key={item.id}
                                source = {item.source} 
                                userimg = {user_info.user_photo}
                                UserName = {user_info.user_name}
                                content = {item.content}
                                Senttime = {item.Senttime} 
                                contentimg = {item.contentimg} />
                        ))} 
            </section>
            </section>
         
        </div>
    );
}

export default MyProfile;