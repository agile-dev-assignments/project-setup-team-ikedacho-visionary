import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PostContent_noAction from '../auxiliary/PostContent_noAction'
import './PostDetail.css'
import { Link } from 'react-router-dom'
import Comment from '../auxiliary/Comment'
import { useHistory,useLocation } from 'react-router-dom'


const PostDetail = (props) => {
        let history=useHistory();
        const {state} = useLocation();
    //     props =
    // (props.location && props.location.props) || {};

    // setData(props.location.props);
    // console.log(props.location.props);
        const goTOPreviousPath=()=>{
            history.goBack()
        }
      const [PostData, setPostData] = useState([
            {"id":1,
            "username":"cgilligan0",
            "user_photo":"https://robohash.org/doloremqueofficiaet.jpg?size=50x50\u0026set=set1",
            "Content":"Nunc nisl. Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum. In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante.",
            "contentimg":["https://www.shutterstock.com/blog/wp-content/uploads/sites/5/2019/07/Man-Silhouette.jpg","https://www.shutterstock.com/blog/wp-content/uploads/sites/5/2019/07/Man-Silhouette.jpg"],
            "post_date":"4/19/2020"
        
        }

  

        ])
        useEffect(() => {
        setPostData(state);
            }, []) // only run it once!
        console.log(state);
        const [data, setData] = useState([

            {"id":1,
            "username":"cgilligan0",
            "user_photo":"https://robohash.org/doloremqueofficiaet.jpg?size=50x50\u0026set=set1",
            "Content":"Nunc nisl. Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum. In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante.",
            "contentimg":["https://www.shutterstock.com/blog/wp-content/uploads/sites/5/2019/07/Man-Silhouette.jpg"],
            "post_date":"4/19/2020"
        
        }
        ])
    
        // the following side-effect will be called once upon initial render
        useEffect(() => {
    
            axios('https://my.api.mockaroo.com/sr.json?key=2d6d6d60')
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
     <div className = "PostDetail" >

        <Link onClick={goTOPreviousPath}> 


        <h1 id="back" >Back</h1>
        </Link>
        <h1 id='title'>Post Content</h1>
        <div className = "Postfield">
            <section className = "main-content">
                <PostContent_noAction 
            source = {PostData.source} 
            userimg = {PostData.userimg}
            UserName = {PostData.UserName}
            content = {PostData.content}
            Senttime = {PostData.Senttime}
            contentimg = {PostData.contentimg}
            />



                               
            </section>
        </div>
            <h1 id='title'>Comments</h1>
            <div className = "comments">

            <section className="comment_list">
            {data.map((item) => (
             <Comment 
                key = {item.id}
                img = {item.userimg}
                UserName = {item.UserName}
                content = {item.content}
                datetime = {item.Senttime}
              />
            ))}
        
      </section>
      </div>
        </div>
 



    );
}

export default PostDetail;
