import React from 'react';
import './Home.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import HomeNav from '../auxiliary/HomeNav';
import WhatsNew from './WhatsNew'
import RecentlyVisited from './RecentlyVisited'
import Recommended from './Recommended'
import Edit from './Edit'

const Home = (props) => {

    return (
        <>
            <Router>
                    <Switch>
                        <Route path = "/edit">
                            {/* <HomeNav /> */}
                            <Edit />
                        </Route>

                        <Route path = "/recent">
                            <HomeNav />
                            <RecentlyVisited />
                        </Route>

                        <Route path = "/recommend">
                            <HomeNav />
                            <Recommended />
                        </Route>

                        <Route path = "/">
                            <HomeNav />
                            <WhatsNew />
                        </Route>  

                    </Switch>
            </Router>
        </>
    );
}

export default Home;