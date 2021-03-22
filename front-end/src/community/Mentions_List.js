import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import './Mentions_List.css'
import Mentions from "./Mentions";

const Mentions_List = (props) => {
    // start a state varaible with a blank array
    const [data, setData] = useState([])

    // the following side-effect will be called once upon initial render
    useEffect(() => {
        // fetch some mock data about animals for sale
        console.log('fetching liked_history')

        axios('https://my.api.mockaroo.com/mentioned_history.json?key=49286830')
            .then((response) => {
                // extract the data from the server response
                setData(response.data)
            })
            .catch((err) => {
                // Mockaroo, which we're using for our Mock API, only allows 200 requests per day on the free plan
                console.log(`Sorry, buster.  No more requests allowed today!`)
                console.error(err) // the server returned an error... probably too many requests... until we pay!

                // make some backup fake data of commented_history
                const backupData = [{
                    "post_text": "Vivamus in felis eu sapien cursus vestibulum. Proin eu mi. Nulla ac enim.",
                    "post_image": "http://dummyimage.com/80x80.png/5fa2dd/ffffff",
                    "post_date": "4/28/2020",
                    "mentioned_by_username": "abromilow0",
                    "mentioned_by_profile": "http://dummyimage.com/50x50.jpg/dddddd/000000",
                    "mentioned_date": "5/21/2020",
                    "mentioned_content": "Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque. Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla."
                }, {
                    "post_text": "Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis. Fusce posuere felis sed lacus.",
                    "post_image": "http://dummyimage.com/80x80.png/ff4444/ffffff",
                    "post_date": "7/13/2020",
                    "mentioned_by_username": "hcarlone1",
                    "mentioned_by_profile": "http://dummyimage.com/50x50.jpg/cc0000/ffffff",
                    "mentioned_date": "10/20/2020",
                    "mentioned_content": "Nullam porttitor lacus at turpis."
                }, {
                    "post_text": "Nulla suscipit ligula in lacus. Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla.",
                    "post_image": "http://dummyimage.com/80x80.jpg/cc0000/ffffff",
                    "post_date": "8/25/2020",
                    "mentioned_by_username": "bluppitt2",
                    "mentioned_by_profile": "http://dummyimage.com/50x50.png/ff4444/ffffff",
                    "mentioned_date": "12/14/2020",
                    "mentioned_content": "Maecenas pulvinar lobortis est. Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum. Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem. Duis aliquam convallis nunc."
                }, {
                    "post_text": "Etiam pretium iaculis justo. In hac habitasse platea dictumst.",
                    "post_image": "http://dummyimage.com/80x80.jpg/5fa2dd/ffffff",
                    "post_date": "12/9/2020",
                    "mentioned_by_username": "egrayley3",
                    "mentioned_by_profile": "http://dummyimage.com/50x50.bmp/ff4444/ffffff",
                    "mentioned_date": "6/27/2020",
                    "mentioned_content": "Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem. Integer tincidunt ante vel ipsum."
                }, {
                    "post_text": "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
                    "post_image": "http://dummyimage.com/80x80.bmp/ff4444/ffffff",
                    "post_date": "1/30/2021",
                    "mentioned_by_username": "crushbury4",
                    "mentioned_by_profile": "http://dummyimage.com/50x50.jpg/cc0000/ffffff",
                    "mentioned_date": "1/18/2021",
                    "mentioned_content": "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue."
                }, {
                    "post_text": "Etiam justo.",
                    "post_image": "http://dummyimage.com/80x80.bmp/dddddd/000000",
                    "post_date": "9/21/2020",
                    "mentioned_by_username": "mparmenter5",
                    "mentioned_by_profile": "http://dummyimage.com/50x50.bmp/dddddd/000000",
                    "mentioned_date": "9/21/2020",
                    "mentioned_content": "Cras pellentesque volutpat dui."
                }, {
                    "post_text": "Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis.",
                    "post_image": "http://dummyimage.com/80x80.bmp/dddddd/000000",
                    "post_date": "10/25/2020",
                    "mentioned_by_username": "hwyson6",
                    "mentioned_by_profile": "http://dummyimage.com/50x50.bmp/dddddd/000000",
                    "mentioned_date": "11/4/2020",
                    "mentioned_content": "Cras pellentesque volutpat dui. Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti. Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris. Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet."
                }, {
                    "post_text": "Morbi quis tortor id nulla ultrices aliquet.",
                    "post_image": "http://dummyimage.com/80x80.png/ff4444/ffffff",
                    "post_date": "9/20/2020",
                    "mentioned_by_username": "sspuner7",
                    "mentioned_by_profile": "http://dummyimage.com/50x50.bmp/cc0000/ffffff",
                    "mentioned_date": "8/4/2020",
                    "mentioned_content": "In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus."
                }, {
                    "post_text": "Nullam porttitor lacus at turpis.",
                    "post_image": "http://dummyimage.com/80x80.bmp/cc0000/ffffff",
                    "post_date": "7/13/2020",
                    "mentioned_by_username": "bpotier8",
                    "mentioned_by_profile": "http://dummyimage.com/50x50.bmp/cc0000/ffffff",
                    "mentioned_date": "11/21/2020",
                    "mentioned_content": "Nam dui. Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius. Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi. Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla."
                }, {
                    "post_text": "Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus. Curabitur at ipsum ac tellus semper interdum.",
                    "post_image": "http://dummyimage.com/80x80.bmp/dddddd/000000",
                    "post_date": "2/13/2021",
                    "mentioned_by_username": "avandenvelden9",
                    "mentioned_by_profile": "http://dummyimage.com/50x50.jpg/dddddd/000000",
                    "mentioned_date": "4/16/2020",
                    "mentioned_content": "Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus. Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci."
                }]
                setData(backupData)
            })
    }, []) // only run it once!

    return (
        <div className="Mentions_List">
            <Link to={'/community'}>
                <h1 id="back">Back</h1>
            </Link>

            <h1 id='title'>Mentions</h1>

            <section className="Mentions_List">
                {data.map((item) => (
                    <Mentions key={item.id} details={item}/>
                ))}

            </section>
        </div>
    )
}

export default Mentions_List
