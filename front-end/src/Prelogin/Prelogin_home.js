import React from 'react';
import './Home.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import PreHomeNav from './PreHav/Pre_HomeNav';
import WhatsNew from '../home/WhatsNew'
import RecentlyVisited from '../home/RecentlyVisited'
import Recommended from '../home/Recommended'
import Edit from '../home/Edit'

const Prelogin_Home = (props) => {

    return (
        <>
            <Router>
                    <Switch>

                        <Route path = "/prerecent">
                            <PreHomeNav />
                            <PreLogin_RecentlyVisited />
                        </Route>

                        <Route path = "/prerecommend">
                            <PreHomeNav />
                            <PreLogin_Recommended />
                        </Route>

                        <Route path = "/">
                            <PreHomeNav />
                            <PreLogin_home/>
                        </Route>  

                    </Switch>
            </Router>
        </>
    );
}

export default Prelogin_Home;