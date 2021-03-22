import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import NameTag from "../auxiliary/NameTag";
import "./Friend_Suggestion.css";

const Friend_Suggestion = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios("https://my.api.mockaroo.com/followings.json?key=2d6d6d60")
      .then((response) => {
        // extract the data from the server response
        setData(response.data);
      })
      .catch((err) => {
        const backupData = [
          {
            img: "https://robohash.org/etillumet.bmp?size=50x50\u0026set=set1",
            UserName: "rmorcombe0",
            bio: "I c M J k Z p l o B ",
            action: "Follow",
          },
          {
            img:
              "https://robohash.org/etadipiscitempore.bmp?size=50x50\u0026set=set1",
            UserName: "ghort1",
            bio: "Q z O A y p s i g W ",
            action: "Follow",
          },
          {
            img:
              "https://robohash.org/suntdebitispossimus.png?size=50x50\u0026set=set1",
            UserName: "kstuckey2",
            bio: "c q t R E c I J a s ",
            action: "Follow",
          },
          {
            img:
              "https://robohash.org/dolorematsaepe.jpg?size=50x50\u0026set=set1",
            UserName: "jpigden3",
            bio: "T m P I T T n H C i ",
            action: "Follow",
          },
          {
            img:
              "https://robohash.org/inciduntillosed.png?size=50x50\u0026set=set1",
            UserName: "kdennis4",
            bio: "B N W i T X X b Z f ",
            action: "Follow",
          },
          {
            img:
              "https://robohash.org/porronobispraesentium.png?size=50x50\u0026set=set1",
            UserName: "ccribbott5",
            bio: "G P n F f Z C D L I ",
            action: "Follow",
          },
          {
            img:
              "https://robohash.org/voluptatedoloreaut.bmp?size=50x50\u0026set=set1",
            UserName: "ccrutchley6",
            bio: "x Y H H F j M u Q P ",
            action: "Follow",
          },
          {
            img:
              "https://robohash.org/quisequisit.jpg?size=50x50\u0026set=set1",
            UserName: "fvamplus7",
            bio: "P Y F z p I K J V G ",
            action: "Follow",
          },
          {
            img:
              "https://robohash.org/rationeeasaepe.jpg?size=50x50\u0026set=set1",
            UserName: "cfarries8",
            bio: "M r p k d F m v Y W ",
            action: "Follow",
          },
          {
            img:
              "https://robohash.org/erroraliquammollitia.jpg?size=50x50\u0026set=set1",
            UserName: "mgorham9",
            bio: "Y R d D H x z H H b ",
            action: "Follow",
          },
        ];
        setData(backupData);
      });
  }, []); // only run it once!

  return (
    <div className="Friend_Suggestion">
      <header>
        <Link to="/Me">
          <button>back</button>
        </Link>
        <h2>Friend Suggestion</h2>
        <p></p>
      </header>

      <div className="input-wrap">
        <input className="input" type="text" placeholder="Search by user here"/>
        <img  src="" alt=""/>
        <span className="icon">&times;</span>
      </div>

      <section className="main-content">
        <p className="desc">people you might know</p>
        <p>
          {data.map((item) => (
            <NameTag
              img={item.img}
              UserName={item.UserName}
              bio={item.bio}
              action={item.action}
            />
          ))}
        </p>
      </section>
    </div>
  );
};

export default Friend_Suggestion;
