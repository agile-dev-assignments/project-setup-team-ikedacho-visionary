import './App.css';
import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './Login'
import MainNav from './MainNav'
import Home from './Home';
import Community from './Community';
import Me from './Me';
import Search from './Search'

function App() {
  return (
    <>
      <div>
        <Router>
          <Switch>

            <Route path="/login">
              <Login />
              <MainNav />
              </Route>

            <Route path="/search">
              <Search />
              <MainNav />
            </Route>

            <Route path="/community">
              <Community />
              <MainNav />
            </Route>

            <Route path="/home">
              <Me />
              <MainNav />
            </Route>

            <Route path="/"> 
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
