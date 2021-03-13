import React from 'react';
import './Home.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import HomeNav from './HomeNav';

const Home = (props) => {

    return (
        <div className = "Home">
            <Router>
                <Switch>
                    
                </Switch>
            </Router>
            <h2>Home Page here</h2>
            <section className = "main-content">
                <p>
                    That stolen figurine would scare any linguist away.
                    A classical composition ever stuns the onlooker.
                </p>
            </section>
        </div>
    );
}

export default Home;