import React from "react";
import {Link} from "react-router-dom";
import Browse from "../auxiliary/Browse";
import "./Browse_History.css";

const Browse_History = (props) => {
    const todayData = [
        {
            UserName: "rmorcombe0",
            contentimgs: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzIu8kI5RdzA0toecWakNnvZwWYT4HBPo8ZQ&usqp=CAU",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzIu8kI5RdzA0toecWakNnvZwWYT4HBPo8ZQ&usqp=CAU",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzIu8kI5RdzA0toecWakNnvZwWYT4HBPo8ZQ&usqp=CAU",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzIu8kI5RdzA0toecWakNnvZwWYT4HBPo8ZQ&usqp=CAU"],
            userimg: "https://robohash.org/etillumet.bmp?size=50x50\u0026set=set1",
            content: "Post Content",
        },
        {
            UserName: "ghort1",
            contentimgs: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzIu8kI5RdzA0toecWakNnvZwWYT4HBPo8ZQ&usqp=CAU"]
            ,
            userimg: "https://robohash.org/etadipiscitempore.bmp?size=50x50\u0026set=set1",
            content: "Post Content",
        },
        {
            UserName: "rmorcombe0",
            contentimgs: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzIu8kI5RdzA0toecWakNnvZwWYT4HBPo8ZQ&usqp=CAU",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzIu8kI5RdzA0toecWakNnvZwWYT4HBPo8ZQ&usqp=CAU",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzIu8kI5RdzA0toecWakNnvZwWYT4HBPo8ZQ&usqp=CAU"],
            userimg: "https://robohash.org/etillumet.bmp?size=50x50\u0026set=set1",
            content: "Post Content",
        },
    ];

    const yesterdayDate = [
        {
            UserName: "asidjashdkasdhk9",
            contentimgs: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzIu8kI5RdzA0toecWakNnvZwWYT4HBPo8ZQ&usqp=CAU",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzIu8kI5RdzA0toecWakNnvZwWYT4HBPo8ZQ&usqp=CAU"],
            userimg: "https://robohash.org/etadipiscitempore.bmp?size=50x50\u0026set=set1",
            content: "Post Content",
        },
        {
            UserName: "rmorcombe0",
            contentimgs: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzIu8kI5RdzA0toecWakNnvZwWYT4HBPo8ZQ&usqp=CAU",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzIu8kI5RdzA0toecWakNnvZwWYT4HBPo8ZQ&usqp=CAU",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzIu8kI5RdzA0toecWakNnvZwWYT4HBPo8ZQ&usqp=CAU"],
            userimg: "https://robohash.org/etillumet.bmp?size=50x50\u0026set=set1",
            content: "Post Content",
        },
        {
            UserName: "ghort1",
            contentimgs: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzIu8kI5RdzA0toecWakNnvZwWYT4HBPo8ZQ&usqp=CAU"]
            ,
            userimg: "https://robohash.org/etadipiscitempore.bmp?size=50x50\u0026set=set1",
            content: "Post Content",
        }
    ];

    return (
        <div className="Browse_History">
            <header>
                <Link to="/Me">
                    <button>back</button>
                </Link>
                <h2>Browse History</h2>
                <p></p>
            </header>

            <div className="Browse_List">
                <h3>today</h3>
                {todayData.map((item) => (
                    <Browse
                        UserName={item.UserName}
                        userimg={item.userimg}
                        content={item.content}
                        contentimgs={item.contentimgs}
                    />
                ))}
            </div>

            <div className="Browse_List">
                <h3>yesterday</h3>
                {yesterdayDate.map((item) => (
                    <Browse
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
