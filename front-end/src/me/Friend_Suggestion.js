import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import NameTag from "../auxiliary/NameTag";
import { Search } from 'react-bootstrap-icons';
import "./Friend_Suggestion.css";

const Friend_Suggestion = (props) => {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState(["People You Might Know"]);
  const [search_name, setSearch_name] = useState([]);

  useEffect(() => {
    // previous developer used my mockaroo API...:
    // "https://my.api.mockaroo.com/followings.json?key=2d6d6d60"
    axios
      .get('/friend_suggestion', {
            params: {
              type: title
            }
          })
      .then((response) => {
        // extract the data from the server response
        setData(response.data.result);
        setTitle(response.data.type)
      })
      .catch((err) => {
        /*
        const backupData = []
        setData(backupData);*/
      });
  }, [search_name]); // only run it once!

  const _setTitle_Search_name = (val) => {
    setSearch_name(val)
    setTitle("Searched Result")
    if (val == '') {
      setTitle("People You Might Know")
    }
  }

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
        <input className="input" type="search" placeholder="Search by user here"
               value = {search_name} onInput = {e => _setTitle_Search_name(e.target.value)}/>
        <Search id='search_icon' color="grey" size={15} />
      </div>

      <section className="main-content">
        <p className="desc">{title}</p>
        <p>
          {data.map((item) => (
            <NameTag
              key={item.id}
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
