import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import Browse from "../auxiliary/Browse";
import "./Browse_History.css";
import axios from "axios"
const Browse_History = (props) => {
    const [PostData, setPostData] = useState([
        {
            viewdate :"",
            data: {UserName: "rmorcombe0",
            contentimg: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzIu8kI5RdzA0toecWakNnvZwWYT4HBPo8ZQ&usqp=CAU"],
            content: "Post Content"
        }
        }
    ])

    // const todayData = [
    //     {
    //         UserName: "rmorcombe0",
    //         contentimgs: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzIu8kI5RdzA0toecWakNnvZwWYT4HBPo8ZQ&usqp=CAU",
    //             "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzIu8kI5RdzA0toecWakNnvZwWYT4HBPo8ZQ&usqp=CAU",
    //             "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzIu8kI5RdzA0toecWakNnvZwWYT4HBPo8ZQ&usqp=CAU",
    //             "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzIu8kI5RdzA0toecWakNnvZwWYT4HBPo8ZQ&usqp=CAU"],
    //         userimg: "https://robohash.org/etillumet.bmp?size=50x50\u0026set=set1",
    //         content: "Post Content",
    //     },
    //     {
    //         UserName: "ghort1",
    //         contentimgs: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzIu8kI5RdzA0toecWakNnvZwWYT4HBPo8ZQ&usqp=CAU"]
    //         ,
    //         userimg: "https://robohash.org/etadipiscitempore.bmp?size=50x50\u0026set=set1",
    //         content: "Post Content",
    //     },
    //     {
    //         UserName: "rmorcombe0",
    //         contentimgs: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzIu8kI5RdzA0toecWakNnvZwWYT4HBPo8ZQ&usqp=CAU",
    //             "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzIu8kI5RdzA0toecWakNnvZwWYT4HBPo8ZQ&usqp=CAU",
    //             "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzIu8kI5RdzA0toecWakNnvZwWYT4HBPo8ZQ&usqp=CAU"],
    //         userimg: "https://robohash.org/etillumet.bmp?size=50x50\u0026set=set1",
    //         content: "Post Content",
    //     },
    // ];

    // const yesterdayDate = [
    //     {
    //         UserName: "asidjashdkasdhk9",
    //         contentimgs: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzIu8kI5RdzA0toecWakNnvZwWYT4HBPo8ZQ&usqp=CAU",
    //             "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzIu8kI5RdzA0toecWakNnvZwWYT4HBPo8ZQ&usqp=CAU"],
    //         userimg: "https://robohash.org/etadipiscitempore.bmp?size=50x50\u0026set=set1",
    //         content: "Post Content",
    //     },
    //     {
    //         UserName: "rmorcombe0",
    //         contentimgs: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzIu8kI5RdzA0toecWakNnvZwWYT4HBPo8ZQ&usqp=CAU",
    //             "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzIu8kI5RdzA0toecWakNnvZwWYT4HBPo8ZQ&usqp=CAU",
    //             "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzIu8kI5RdzA0toecWakNnvZwWYT4HBPo8ZQ&usqp=CAU"],
    //         userimg: "https://robohash.org/etillumet.bmp?size=50x50\u0026set=set1",
    //         content: "Post Content",
    //     },
    //     {
    //         UserName: "ghort1",
    //         contentimgs: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzIu8kI5RdzA0toecWakNnvZwWYT4HBPo8ZQ&usqp=CAU"]
    //         ,
    //         userimg: "https://robohash.org/etadipiscitempore.bmp?size=50x50\u0026set=set1",
    //         content: "Post Content",
    //     }
    // ];

    useEffect(() => {
    
        axios('/browse')
            .then((response) => {
                // extract the data from the server response
                setPostData(response.data)
            })
            .catch((err) => {
               console.log(err);
            })
        }, []) // only run it once!

        console.log(PostData[0].contentimgs);
        
        

          return (
        <div className="Browse_History">
            <header>
                <Link to="/Me">
                    <h3>back</h3>
                </Link>
                <h3>Browse History</h3>
                <p></p>
            </header>

            <div className="Browse_List">
            {PostData.map((item) => (
                console.log("rendering"),
                <Browse 
                    viewdate = {item.viewDate}
                    UserName={item.UserName}
                    userimg={item.userimg}
                    content={item.content}
                    contentimgs={item.contentimgs}
                />
                  
            ))}
               
            </div>

        </div>
    );

};

export default Browse_History;
