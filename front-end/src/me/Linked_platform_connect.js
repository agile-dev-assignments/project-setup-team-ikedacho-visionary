import React from 'react'
//import user_info from '../me/Me'
import './Linked_platform_connect.css'

const Linked_platform_connect = (props) => {
  
    const setImg=(e)=>{   //e is the id of the element that call this function. it is a string
        if (e === "Facebook"){
            document.getElementById(e).src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMzAiIGhlaWdodD0iMzAiCnZpZXdCb3g9IjAgMCAxNzIgMTcyIgpzdHlsZT0iIGZpbGw6I2ZmZmZmZjsiPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0wLDE3MnYtMTcyaDE3MnYxNzJ6IiBmaWxsPSJub25lIj48L3BhdGg+PGcgZmlsbD0iI2ZmZmZmZiI+PHBhdGggZD0iTTEyNS41OTU4Myw2NC41aC0yNS4yNjI1di0xNC4zMzMzM2MwLC03LjM5NiAwLjYwMiwtMTIuMDU0MzMgMTEuMjAxNSwtMTIuMDU0MzNoMTMuMzg3MzN2LTIyLjc5Yy02LjUxNDUsLTAuNjczNjcgLTEzLjA2NDgzLC0xLjAwMzMzIC0xOS42MjIzMywtMC45ODljLTE5LjQ0MzE3LDAgLTMzLjYzMzE3LDExLjg3NTE3IC0zMy42MzMxNywzMy42NzYxN3YxNi40OTA1aC0yMS41djI4LjY2NjY3bDIxLjUsLTAuMDA3MTd2NjQuNTA3MTdoMjguNjY2Njd2LTY0LjUyMTVsMjEuOTczLC0wLjAwNzE3eiI+PC9wYXRoPjwvZz48L2c+PC9zdmc+"
            document.getElementById(e).parentElement.style.backgroundColor='#4267B2'
        }
        else if (e === "Instagram"){
            document.getElementById(e).src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMzAiIGhlaWdodD0iMzAiCnZpZXdCb3g9IjAgMCAxNzIgMTcyIgpzdHlsZT0iIGZpbGw6I2ZmZmZmZjsiPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0wLDE3MnYtMTcyaDE3MnYxNzJ6IiBmaWxsPSJub25lIj48L3BhdGg+PGcgZmlsbD0iI2ZmZmZmZiI+PHBhdGggZD0iTTQ5LjkyNTQ4LDBjLTI3LjQ5NTE5LDAgLTQ5LjkyNTQ4LDIyLjQzMDI5IC00OS45MjU0OCw0OS45MjU0OHY3Mi4xNDkwNGMwLDI3LjQ5NTE5IDIyLjQzMDI5LDQ5LjkyNTQ4IDQ5LjkyNTQ4LDQ5LjkyNTQ4aDcyLjE0OTA0YzI3LjQ5NTE5LDAgNDkuOTI1NDgsLTIyLjQzMDI5IDQ5LjkyNTQ4LC00OS45MjU0OHYtNzIuMTQ5MDRjMCwtMjcuNDk1MTkgLTIyLjQzMDI5LC00OS45MjU0OCAtNDkuOTI1NDgsLTQ5LjkyNTQ4ek00OS45MjU0OCwxMy4yMzA3N2g3Mi4xNDkwNGMyMC4zMzcxNCwwIDM2LjY5NDcxLDE2LjMzMTczIDM2LjY5NDcxLDM2LjY5NDcxdjcyLjE0OTA0YzAsMjAuMzM3MTQgLTE2LjMzMTczLDM2LjY5NDcxIC0zNi42OTQ3MSwzNi42OTQ3MWgtNzIuMTQ5MDRjLTIwLjMzNzE0LDAgLTM2LjY5NDcxLC0xNi4zMzE3MyAtMzYuNjk0NzEsLTM2LjY5NDcxdi03Mi4xNDkwNGMwLC0yMC4zMzcxNCAxNi4zMzE3MywtMzYuNjk0NzEgMzYuNjk0NzEsLTM2LjY5NDcxek0xMzUuNjE1MzgsMjYuNDYxNTRjLTUuNDc4MzcsMCAtOS45MjMwOCw0LjQ0NDcxIC05LjkyMzA4LDkuOTIzMDhjMCw1LjQ3ODM3IDQuNDQ0NzEsOS45MjMwOCA5LjkyMzA4LDkuOTIzMDhjNS40NzgzNywwIDkuOTIzMDgsLTQuNDQ0NzEgOS45MjMwOCwtOS45MjMwOGMwLC01LjQ3ODM3IC00LjQ0NDcxLC05LjkyMzA4IC05LjkyMzA4LC05LjkyMzA4ek04NiwzOS42OTIzMWMtMjUuNTA1NDEsMCAtNDYuMzA3NjksMjAuODAyMjggLTQ2LjMwNzY5LDQ2LjMwNzY5YzAsMjUuNTA1NDEgMjAuODAyMjgsNDYuMzA3NjkgNDYuMzA3NjksNDYuMzA3NjljMjUuNTA1NDEsMCA0Ni4zMDc2OSwtMjAuODAyMjggNDYuMzA3NjksLTQ2LjMwNzY5YzAsLTI1LjUwNTQxIC0yMC44MDIyOCwtNDYuMzA3NjkgLTQ2LjMwNzY5LC00Ni4zMDc2OXpNODYsNTIuOTIzMDhjMTguMzQ3MzYsMCAzMy4wNzY5MiwxNC43Mjk1NyAzMy4wNzY5MiwzMy4wNzY5MmMwLDE4LjM0NzM2IC0xNC43Mjk1NiwzMy4wNzY5MiAtMzMuMDc2OTIsMzMuMDc2OTJjLTE4LjM0NzM1LDAgLTMzLjA3NjkyLC0xNC43Mjk1NiAtMzMuMDc2OTIsLTMzLjA3NjkyYzAsLTE4LjM0NzM1IDE0LjcyOTU3LC0zMy4wNzY5MiAzMy4wNzY5MiwtMzMuMDc2OTJ6Ij48L3BhdGg+PC9nPjwvZz48L3N2Zz4="
            document.getElementById(e).parentElement.style.backgroundImage = 'linear-gradient(#405DE6, #5851D8,#833AB4,#C13584,#E1306C,#FD1D1D,#F56040,#F77737,#FCAF45,#FFDC80)'
        }  
        else if (e === "Twitter"){
            document.getElementById(e).src =  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMzAiIGhlaWdodD0iMzAiCnZpZXdCb3g9IjAgMCAxNzIgMTcyIgpzdHlsZT0iIGZpbGw6I2ZmZmZmZjsiPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0wLDE3MnYtMTcyaDE3MnYxNzJ6IiBmaWxsPSJub25lIj48L3BhdGg+PGcgZmlsbD0iI2ZmZmZmZiI+PHBhdGggZD0iTTE3MiwzMC44MjIyNmMtNi40Mzg4LDIuODU1NDcgLTEyLjkwNTYsNS4wMTEwNyAtMjAuMDcyMjYsNS43Mzg5NGM3LjE2NjY3LC00LjMxMTIgMTIuOTA1NiwtMTEuNDc3ODcgMTUuNzYxMDcsLTE5LjM3MjRjLTcuMTY2NjcsNC4zMTExOSAtMTQuMzMzMzMsNy4xNjY2NyAtMjIuMTk5ODgsOC42MjI0Yy03LjE2NjY3LC03LjE2NjY3IC0xNi40ODg5MywtMTEuNDc3ODcgLTI2LjUxMTA2LC0xMS40Nzc4N2MtMTkuMzcyNCwwIC0zNS4xMzM0NywxNS43NjEwNyAtMzUuMTMzNDcsMzUuMTA1NDdjMCwyLjg4MzQ2IDAsNS43Mzg5MyAwLjcyNzg2LDcuODk0NTNjLTI5LjM5NDUzLC0xLjQyNzc0IC01NS4xNzc3MywtMTUuMDYxMTkgLTcyLjM5NDUzLC0zNi41NjExOWMtMy41ODMzMyw1LjAzOTA2IC01LjAxMTA3LDExLjQ3Nzg2IC01LjAxMTA3LDE3LjkxNjY3YzAsMTIuMjA1NzMgNi40Mzg4MSwyMi45NTU3MyAxNS43NjEwNywyOS4zOTQ1M2MtNS43Mzg5MywtMC43Mjc4NiAtMTEuNDQ5ODcsLTIuMTU1NiAtMTUuNzYxMDcsLTQuMzExMTljMCwwIDAsMCAwLDAuNzI3ODZjMCwxNy4xODg4MSAxMi4xNzc3NCwzMS41MjIxNCAyNy45Mzg4MSwzNC40MDU2Yy0yLjg1NTQ3LDAuNjk5ODggLTUuNzEwOTQsMS40Mjc3NCAtOS4yOTQyNywxLjQyNzc0Yy0yLjE1NTYsMCAtNC4zMTEyLDAgLTYuNDY2OCwtMC43Mjc4NmM0LjMxMTE5LDE0LjMzMzMzIDE3LjIxNjgsMjQuMzgzNDYgMzIuOTc3ODYsMjQuMzgzNDZjLTEyLjE3NzczLDkuMzIyMjcgLTI3LjIzODkzLDE1LjAzMzIxIC00My43Mjc4NiwxNS4wMzMyMWMtMi44NTU0NywwIC01LjczODkzLDAgLTguNTk0NCwtMC42OTk4OGMxNS43NjEwNywxMC4wMjIxNCAzNC40MDU2LDE1Ljc2MTA3IDUzLjc1LDE1Ljc2MTA3YzY1LjIyNzg3LDAgMTAwLjMzMzMzLC01My43NSAxMDAuMzMzMzMsLTEwMC4zMzMzM2MwLC0xLjQyNzc0IDAsLTIuODU1NDcgMCwtNC4zMTExOWM3LjE2NjY3LC01LjAxMTA3IDEyLjkwNTYsLTExLjQ0OTg4IDE3LjkxNjY3LC0xOC42MTY1NCI+PC9wYXRoPjwvZz48L2c+PC9zdmc+"
            document.getElementById(e).parentElement.style.backgroundColor='#1DA1F2'
        }  
        else if (e === "O-Zone"){
            document.getElementById(e).src =  "https://img.icons8.com/material-rounded/30/ffffff/filled-star.png"
        }  

        //define more platform's image here!
    }

    return (
    
        <div className='icon' id="select"  >  {/* target is the element clicked */}
        {/*  cannot use onLoad in this case, it will cause infinite loop. Reason: When image is not loaded you aren't actually rendering the image. You need to render it for its onLoad to fire*/}
        {/*The problem is that you re-assign the successUrl repeatedly in your onload callback, causing infinite recursion because it gets called over and over again.*/}
        {/*So I will use onError in this case with src='' */}
            <img  id={props.details} onError={e=>{setImg(e.target.id)}}  alt={props.details}   src=""/>
            
            <button id={props.details} >Update</button>
        </div>

    )
}

// make this function available to be imported into another module
export default Linked_platform_connect
