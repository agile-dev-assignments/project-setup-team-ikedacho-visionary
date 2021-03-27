import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Followings.css'
import { Link } from 'react-router-dom'
import NameTag from '../auxiliary/NameTag'
import './Followings.css'

const Followings = (props) => {
    const [data, setData] = useState([])

    useEffect(() => {
        // 'https://my.api.mockaroo.com/followings.json?key=2d6d6d60'
        axios('/followings')
            .then((response) => {
                // extract the data from the server response
                setData(response.data)
            })
            .catch((err) => {
                /*const backupData = [{"img":"https://robohash.org/etillumet.bmp?size=50x50\u0026set=set1","UserName":"rmorcombe0","bio":"I c M J k Z p l o B ","action":"unfollow"},{"img":"https://robohash.org/etadipiscitempore.bmp?size=50x50\u0026set=set1","UserName":"ghort1","bio":"Q z O A y p s i g W ","action":"unfollow"},{"img":"https://robohash.org/suntdebitispossimus.png?size=50x50\u0026set=set1","UserName":"kstuckey2","bio":"c q t R E c I J a s ","action":"unfollow"},{"img":"https://robohash.org/dolorematsaepe.jpg?size=50x50\u0026set=set1","UserName":"jpigden3","bio":"T m P I T T n H C i ","action":"unfollow"},{"img":"https://robohash.org/inciduntillosed.png?size=50x50\u0026set=set1","UserName":"kdennis4","bio":"B N W i T X X b Z f ","action":"unfollow"},{"img":"https://robohash.org/porronobispraesentium.png?size=50x50\u0026set=set1","UserName":"ccribbott5","bio":"G P n F f Z C D L I ","action":"unfollow"},{"img":"https://robohash.org/voluptatedoloreaut.bmp?size=50x50\u0026set=set1","UserName":"ccrutchley6","bio":"x Y H H F j M u Q P ","action":"unfollow"},{"img":"https://robohash.org/quisequisit.jpg?size=50x50\u0026set=set1","UserName":"fvamplus7","bio":"P Y F z p I K J V G ","action":"unfollow"},{"img":"https://robohash.org/rationeeasaepe.jpg?size=50x50\u0026set=set1","UserName":"cfarries8","bio":"M r p k d F m v Y W ","action":"unfollow"},{"img":"https://robohash.org/erroraliquammollitia.jpg?size=50x50\u0026set=set1","UserName":"mgorham9","bio":"Y R d D H x z H H b ","action":"unfollow"}
                ]
                setData(backupData)*/
            })
        }, []) // only run it once!

    return (
        <div className = "Followings">
            <h2>Followings Page here</h2>
            <Link to = '/Me'>
                <button>back</button>
            </Link>
            <section className = "main-content">
                <p>
                    {data.map((item) => (
                        <NameTag 
                            key={item.id}
                            img = {item.img}
                            UserName = {item.UserName}
                            bio = {item.bio}
                            action = {item.action} />
                    ))}
                </p>
            </section>
        </div>
    );
}

export default Followings;