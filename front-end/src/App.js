import './App.css';
import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import MainNav from './auxiliary/MainNav'
import Home from './home/Home';
import Community from './community/Community';
import Me from './me/Me';
import Search from './search/Search'
import Showcase from './auxiliary/Showcase'

function App() {
  return (
    <>
      <div>
        <Router>
          <Switch>

            <Route path = "/search">
              <Search />
              <MainNav />
            </Route>

            <Route path = "/community">
              <Community />
              <MainNav />
            </Route>

            <Route path = "/me">
              <Me />
              <MainNav />
            </Route>

            <Route path = "/components_showcase">
              <Showcase />
              <MainNav />
            </Route>

            <Route path = "/"> 
              <Home />
              <MainNav />
            </Route>

          </Switch>
        </Router>
      </div>
    </>
  );
}

export default App;
