import React from 'react'
import { Link } from 'react-router-dom'
import './Liked.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import PostContent from '../auxiliary/PostContent'

const Liked = (props) => {

/* 
ENTIRE FUNCTION IS COMMENTED OUT BY XINYU-BOT 
Because neither is correct and, 
this part of feature needs future discussion. 
    added time: 2021/3/27 15:58 China Time
    author: Xinyu Xie
*/

/*
    //console.log(props);

  const [data, setData] = useState([])
  // the following side-effect will be called once upon initial render
useEffect(() => {

  axios('http://localhost:3000/')
      .then((response) => {
          // extract the data from the server response
          setData(response.data)
      })
      .catch((err) => {
          const backupData = [{"source":"Konklux","userimg":"https://robohash.org/laboriosamaliquamconsequuntur.jpg?size=50x50\u0026set=set1","UserName":"mgalliard0","content":"Aaaahhhhhh! I do not know what to say. ","Senttime":"10/18/2020","contentimg":"http://dummyimage.com/112x136.jpg/cc0000/ffffff"},{"source":"Domainer","userimg":"https://robohash.org/utculpaesse.png?size=50x50\u0026set=set1","UserName":"hrevie1","content":"Aaaahhhhhhhhhhh! I do not know what to say. ","Senttime":"4/15/2020","contentimg":"http://dummyimage.com/228x124.bmp/cc0000/ffffff"},{"source":"Ventosanzap","userimg":"https://robohash.org/etquosa.bmp?size=50x50\u0026set=set1","UserName":"avedenisov2","content":"Aaaahhhhh! I do not know what to say. ","Senttime":"2/5/2021","contentimg":"http://dummyimage.com/107x217.jpg/5fa2dd/ffffff"},{"source":"Lotlux","userimg":"https://robohash.org/inciduntatest.png?size=50x50\u0026set=set1","UserName":"fhenniger3","content":"Aaaahhhhhhhhhhhhh! I do not know what to say. ","Senttime":"3/1/2021","contentimg":"http://dummyimage.com/219x227.jpg/5fa2dd/ffffff"},{"source":"Span","userimg":"https://robohash.org/quidemquicupiditate.bmp?size=50x50\u0026set=set1","UserName":"gmacqueen4","content":"Aaaahhhhhhhhhhhhhh! I do not know what to say. ","Senttime":"5/21/2020","contentimg":"http://dummyimage.com/185x108.bmp/dddddd/000000"},{"source":"Namfix","userimg":"https://robohash.org/dolorcumqueeaque.png?size=50x50\u0026set=set1","UserName":"gmorot5","content":"Aaaahhhhhhhhhhhh! I do not know what to say. ","Senttime":"9/27/2020","contentimg":"http://dummyimage.com/223x118.jpg/5fa2dd/ffffff"},{"source":"Overhold","userimg":"https://robohash.org/oditdolorenesciunt.png?size=50x50\u0026set=set1","UserName":"mmcileen6","content":"Aaaahhhhhhhhhhhh! I do not know what to say. ","Senttime":"6/17/2020","contentimg":"http://dummyimage.com/181x111.bmp/5fa2dd/ffffff"},{"source":"Pannier","userimg":"https://robohash.org/etnobisest.jpg?size=50x50\u0026set=set1","UserName":"gthrustle7","content":"Aaaahhhhhhhhhhhhhhh! I do not know what to say. ","Senttime":"5/2/2020","contentimg":"http://dummyimage.com/161x248.png/ff4444/ffffff"},{"source":"Overhold","userimg":"https://robohash.org/oditautet.jpg?size=50x50\u0026set=set1","UserName":"rlafond8","content":"Aaaahhhhhh! I do not know what to say. ","Senttime":"3/21/2020","contentimg":"http://dummyimage.com/123x113.png/5fa2dd/ffffff"},{"source":"Bamity","userimg":"https://robohash.org/autdeleniticonsequuntur.bmp?size=50x50\u0026set=set1","UserName":"ckarleman9","content":"Aaaahhhhhh! I do not know what to say. ","Senttime":"11/14/2020","contentimg":"http://dummyimage.com/234x151.jpg/cc0000/ffffff"}
          ]
          setData(backupData)
      })
  }, []) // only run it once!

    return (
    // <article className="Liked">
    //         <div>
    //           <Link to={`/my_profile`}>
    //             <img class='inline-block' id="avatar" src={props.details.liked_by_profile} />
    //             <h1 class='inline-block' id='username1' >{props.details.liked_by_username}</h1>
    //             </Link>
    //             <span id="commented_date">{props.details.post_date}</span>
    //         </div>

    //     <p id='comment'>Liked @{props.details.post_created_by}: {props.details.post_text}</p>

        <section className = "liked-content">
            {data.map((item) => (
                    <PostContent  
                        key={item.id}
                        likeswitch = {true}
                        source = {item.source} 
                        userimg = {item.userimg}
                        UserName = {item.UserName}
                        content = {item.content}
                        Senttime = {item.Senttime} 
                        contentimg = {item.contentimg} />
                ))} 
        </section>



    )
*/

    // Note that this is just a temporary solution and,
    // we will need to discuss on this. 
    return (
        /*
        <section className = "/me/Liked">
            <PostContent  
                key={props.id}
                likeswitch = {true}
                source = {props.source} 
                userimg = {props.userimg}
                UserName = {props.UserName}
                content = {props.content}
                Senttime = {props.Senttime} 
                contentimg = {props.contentimg} />
        </section>
        */
        <article className="Liked">
             <div>
               <Link to={`/my_profile`}>
                 <img class='inline-block' id="avatar" src={props.details.liked_by_profile} />
                 <h1 class='inline-block' id='username1' >{props.details.liked_by_username}</h1>
                 </Link>
                 <span id="commented_date">{props.details.post_date}</span>
             </div>

        <p id='comment'>Liked @{props.details.post_created_by}: {props.details.post_text}</p>
        </article>
    )
}
  
// make this function available to be imported into another module
export default Liked
