import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './ToRepost.css'

const Repost = (props) => {
    const [data, setData] = useState([])

    const Card = (props) => {
        return (
          <div className = "Card">
            <p onClick = {props.action}>{props.text}</p>
          </div>
      )
    }

    const Friends = (props) => {
        return (
            <div className = "friends">
                <img className = "avatar" src = {props.pic}/>
                <button action = {() => {alert("a friends is clicked")}} 
                        className = "friends">{props.name}</button>
            </div>
        )
    }

    // the following side-effect will be called once upon initial render
    useEffect(() => {

        axios('https://my.api.mockaroo.com/repost_on_content.json?key=2d6d6d60')
            .then((response) => {
                // extract the data from the server response
                setData(response.data)
            })
            .catch((err) => {
                const backupData = [
                    {"friends":
                        {"pic":"https://robohash.org/evenietconsequaturmolestias.bmp?size=50x50\u0026set=set1",
                        "name":"gyukhnini0"},
                    "platforms":"Tempsoft"},

                    {"friends":
                        {"pic":"https://robohash.org/pariaturvoluptatumbeatae.jpg?size=50x50\u0026set=set1",
                        "name":"blortzing1"},
                    "platforms":"Toughjoyfax"}
                ]
                setData(backupData)
            })
        }, []) // only run it once!

    
    // alert should be replaced by actual APIs
    // for some reasons the alert() for buttons in loop does not work
    return (
        <div className = "Repost">

            <Card action = {() => {alert("Repost without caption")}} text = "Fast Repost"/>
            <Card action = {() => {alert("Repost with caption")}} text = "Repost"/>

            <p>Share to friends</p> 
                <section className = "friends">
                    {data.map(item => (
                        <Friends name = {item.friends_name} 
                                 pic = {item.friends_pic} />
                        ))}
                </section> 

            <p>Share to linked platform</p>
                <section className = "platforms">
                    {data.map(item => (
                        <button action = {() => {alert("a friend is clicked")}} 
                                className = "platforms">{item.platforms}</button>
                        ))}    
                </section>  

        </div>
    );
}

export default Repost;