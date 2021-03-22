import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import './ToRepost.css'
import ToRepost_edit from './ToRepost_edit'

const Repost = (props) => {
    const [data, setData] = useState([])

    const [state, setState] = useState({
        showRepostEdit: false,
    })

    const history = useHistory();

    const _showRepostEdit = () => {
        let cur = state.showRepostEdit
        setState({
            showRepostEdit: !cur
        });
    };

    const _toRepost = () => {
        history.push('/repost')
    }

    const Friends = (props) => {
        return (
            <div className="repost_friends_component">
                <img className="repost_avatar" src={props.pic}/>
                <button onClick={() => {
                    alert("A friends is clicked")
                }}
                        className="repost_friends">{props.name}</button>
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
                const backupData = [{
                    "friends_pic": "https://robohash.org/quiaofficiisdolorem.bmp?size=50x50\u0026set=set1",
                    "friends_name": "cbearcroft0",
                    "platforms": "Zamit"
                }, {
                    "friends_pic": "https://robohash.org/quosaliquamvoluptas.jpg?size=50x50\u0026set=set1",
                    "friends_name": "dbowskill1",
                    "platforms": "Holdlamis"
                }, {
                    "friends_pic": "https://robohash.org/suscipitestconsectetur.bmp?size=50x50\u0026set=set1",
                    "friends_name": "bwhiten2",
                    "platforms": "Flexidy"
                }, {
                    "friends_pic": "https://robohash.org/aliquametvoluptatum.jpg?size=50x50\u0026set=set1",
                    "friends_name": "bminmagh3",
                    "platforms": "Pannier"
                }, {
                    "friends_pic": "https://robohash.org/suscipitmodisunt.png?size=50x50\u0026set=set1",
                    "friends_name": "criccardo4",
                    "platforms": "Zoolab"
                }, {
                    "friends_pic": "https://robohash.org/isteinventoreenim.png?size=50x50\u0026set=set1",
                    "friends_name": "ysilversmid5",
                    "platforms": "Tin"
                }, {
                    "friends_pic": "https://robohash.org/deseruntquotenetur.jpg?size=50x50\u0026set=set1",
                    "friends_name": "mheak6",
                    "platforms": "Prodder"
                }, {
                    "friends_pic": "https://robohash.org/voluptateutest.png?size=50x50\u0026set=set1",
                    "friends_name": "tstilwell7",
                    "platforms": "Solarbreeze"
                }, {
                    "friends_pic": "https://robohash.org/iustonecessitatibuscumque.png?size=50x50\u0026set=set1",
                    "friends_name": "amaceveley8",
                    "platforms": "Viva"
                }, {
                    "friends_pic": "https://robohash.org/harumetconsectetur.png?size=50x50\u0026set=set1",
                    "friends_name": "ksancto9",
                    "platforms": "Konklux"
                }
                ]
                setData(backupData)
            })
    }, []) // only run it once!


    // alert should be replaced by actual APIs
    // for some reasons the alert() for buttons in loop does not work
    return (
        <div className="ToRepost">

            <button className="Repost_fast">Fast Repost</button>
            <button className="Repost_edit_button" onClick={() => window.location.href = '/repost'}>Repost</button>

            <p>Share to friends</p>
            <section className="repost_share_to_friends_list">
                {data.map(item => (
                    <Friends name={item.friends_name}
                             pic={item.friends_pic}/>
                ))}
            </section>

            <p>Share to linked platform</p>
            <section className="repost_share_to_platforms">
                {data.map(item => (
                    <button onClick={() => {
                        alert("a platform is clicked")
                    }}
                            className="repost_share_to_platforms">{item.platforms}</button>
                ))}
            </section>

        </div>
    );
}

export default Repost;
