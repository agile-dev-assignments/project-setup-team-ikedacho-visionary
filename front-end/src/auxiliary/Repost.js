import React from 'react';
import './Repost.css'

const Repost = (props) => {

    function Card (props) {
        return (
          <div className = "Card">
            <p onClick = {props.action}>{props.text}</p>
          </div>
      )
    }

    const Friends = (props) => {
        return (
            <div className = "friends">
                <img className = "avatar" src = {props.pic} alt = {props.name}/>
                <button action = {() => {alert("a friends is clicked")}} 
                        className = "friends">{props.name}</button>
            </div>
        )
    }
    

    // alert should be replaced by actual APIs
    // for some reasons the alert() for buttons in loop does not work
    return (
        <div className = "Repost">
            <Card action = {() => {alert("Repost without caption")}} text = "Fast Repost"/>
            <Card action = {() => {alert("Repost with caption")}} text = "Repost"/>

            <p>Share to friends</p> 
                <section className = "friends">
                    {props.friends.map(item => (
                        <Friends name = {item.name} pic = {item.pic}/>
                        ))}
                </section> 

            <p>Share to linked platform</p>
                <section className = "platforms">
                    {props.platforms.map(item => (
                        <button action = {() => {alert("a friend is clicked")}} 
                                className = "platforms">{item}</button>
                        ))}    
                </section>  
        </div>
    );
}

export default Repost;