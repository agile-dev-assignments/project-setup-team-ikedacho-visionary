import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PostContentPrelogin from '../auxiliary/PostContent_prelogin'
import './Prelogin.css'



export default class Prelogin extends React.Component {
    constructor(){
        super();
        this.state = {
            data: []
        };
      

    }

componentDidMount = () =>{
    axios.get("/getprelogin").then(response => {
        //console.log(response.data.userimg)
        //console.log(this.state);
        this.setState({ data: response.data });
        console.log(this.state.data);
        
       // console.log(data);
    });
}

    render() {
        return(
        <div className = "Prelogin">
           
            <section className = "main-content">             

            {this.state.data.map((item) =>
            <PostContentPrelogin 
                key = {item.index}
                source = {item.source} 
                userimg = {item.userimg}
                UserName = {item.UserName}
                content = {item.content}
                Senttime = {item.Senttime} 
                contentimg = {item.contentimg} />)}
            
                    
            </section>
        
        </div>
    
            );
}
}