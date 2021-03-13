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

    // get friend list API
    function get_friend_list (userID) {
        return []
    }
    // get linked platform API
    function get_linked_platform (userID) {
        return []
    }
    
    // the round clickable profile picture button for "share to friends" can be find here
    // https://stackoverflow.com/questions/38367110/round-clickable-profile-image-with-a-button-on-the-bottom-in-css

    // "Share to linked platform" should be much easier compared to "share to friends"

    // alert should be replaced by actual APIs
    return (
        <div className = "Repost">
            <Card action = {() => {alert("Repost without caption")}} text = "Fast Repost"/>
            <Card action = {() => {alert("Repost with caption")}} text = "Repost"/>
            <p>Share to friends</p> 
            <p>Share to linked platform</p>
        </div>
    );
}

export default Repost;