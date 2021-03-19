import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './ToRepost.css'
import ToRepost_edit from './ToRepost_edit'

const Repost = (props) => {
    const [data, setData] = useState([])

    const [state, setState] = useState({
        showRepostEdit: false,
      })
 

  const _showRepostEdit = () => {
    let cur = state.showRepostEdit
    setState({
        showRepostEdit: !cur
    });
  };

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
                const backupData = [{"friends_pic":"https://robohash.org/quiaofficiisdolorem.bmp?size=50x50\u0026set=set1","friends_name":"cbearcroft0","platforms":"Zamit"},{"friends_pic":"https://robohash.org/quosaliquamvoluptas.jpg?size=50x50\u0026set=set1","friends_name":"dbowskill1","platforms":"Holdlamis"},{"friends_pic":"https://robohash.org/suscipitestconsectetur.bmp?size=50x50\u0026set=set1","friends_name":"bwhiten2","platforms":"Flexidy"},{"friends_pic":"https://robohash.org/aliquametvoluptatum.jpg?size=50x50\u0026set=set1","friends_name":"bminmagh3","platforms":"Pannier"},{"friends_pic":"https://robohash.org/suscipitmodisunt.png?size=50x50\u0026set=set1","friends_name":"criccardo4","platforms":"Zoolab"},{"friends_pic":"https://robohash.org/isteinventoreenim.png?size=50x50\u0026set=set1","friends_name":"ysilversmid5","platforms":"Tin"},{"friends_pic":"https://robohash.org/deseruntquotenetur.jpg?size=50x50\u0026set=set1","friends_name":"mheak6","platforms":"Prodder"},{"friends_pic":"https://robohash.org/voluptateutest.png?size=50x50\u0026set=set1","friends_name":"tstilwell7","platforms":"Solarbreeze"},{"friends_pic":"https://robohash.org/iustonecessitatibuscumque.png?size=50x50\u0026set=set1","friends_name":"amaceveley8","platforms":"Viva"},{"friends_pic":"https://robohash.org/harumetconsectetur.png?size=50x50\u0026set=set1","friends_name":"ksancto9","platforms":"Konklux"}
                ]
                setData(backupData)
            })
        }, []) // only run it once!

    
    // alert should be replaced by actual APIs
    // for some reasons the alert() for buttons in loop does not work
    return (
        <div className = "Repost">

            <button class = "Repost_fast">Fast Repost</button>
            <button class = "Repost_edit_button" onClick = {_showRepostEdit.bind()}>Repost</button>
            {state.showRepostEdit && (
              <>
                <ToRepost_edit data = {data}/>
              </>
            )}

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