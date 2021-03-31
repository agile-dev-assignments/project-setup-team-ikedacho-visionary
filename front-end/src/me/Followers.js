import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Followings.css'
import { Link, useLocation, useHistory} from 'react-router-dom'
import NameTag from '../auxiliary/NameTag'
import './Followers.css'

const Followers = (props) => {
    const [data, setData] = useState([])
    const {state} = useLocation()
    const history = useHistory()

    // go back to the previous page
    const goTOPreviousPath = () => {
        history.goBack()
    }

    useEffect(() => {
        //https://my.api.mockaroo.com/followers.json?key=2d6d6d60
        axios
            .get('/api_followers', {
                params: {
                    UserName: state.UserName
                }
            })
            .then((response) => {
                // extract the data from the server response
                setData(response.data)
            })
            .catch((err) => {
                /*const backupData = [{"img":"https://robohash.org/animirationequia.bmp?size=50x50\u0026set=set1","UserName":"adruitt0","bio":"p v g t d W U J W w ","action":"unfollow"},{"img":"https://robohash.org/sedquosequi.bmp?size=50x50\u0026set=set1","UserName":"abalser1","bio":"k e x N L B C M S u ","action":"unfollow"},{"img":"https://robohash.org/ullamvoluptasiure.png?size=50x50\u0026set=set1","UserName":"agretton2","bio":"B C I S O L G x U J ","action":"unfollow"},{"img":"https://robohash.org/quiperferendisdistinctio.jpg?size=50x50\u0026set=set1","UserName":"cchaffin3","bio":"j D N E t y F X N I ","action":"unfollow"},{"img":"https://robohash.org/doloremetquaerat.png?size=50x50\u0026set=set1","UserName":"sbrosenius4","bio":"P D n U y n j E b E ","action":"unfollow"},{"img":"https://robohash.org/doloribusfugitest.png?size=50x50\u0026set=set1","UserName":"koskehan5","bio":"s b z h i R M C b W ","action":"unfollow"},{"img":"https://robohash.org/totamvoluptasoccaecati.png?size=50x50\u0026set=set1","UserName":"afrackiewicz6","bio":"u C V V n q f h C t ","action":"unfollow"},{"img":"https://robohash.org/undeevenietquidem.jpg?size=50x50\u0026set=set1","UserName":"wghidetti7","bio":"r v x W x V Y k j E ","action":"unfollow"},{"img":"https://robohash.org/porroautut.png?size=50x50\u0026set=set1","UserName":"lswaby8","bio":"D h m L d E W G j r ","action":"unfollow"},{"img":"https://robohash.org/dignissimosillumplaceat.jpg?size=50x50\u0026set=set1","UserName":"lclemerson9","bio":"D S z Y s l g z g r ","action":"unfollow"}
                ]
                setData(backupData)*/
            })
        }, []) // only run it once!

    return (
        <div className = "Followers">
            <h2>Followers Page here</h2>
            <Link onClick = {goTOPreviousPath.bind()}>
                <button>back</button>
            </Link>
            <section className = "Followers_main-content">
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

export default Followers;