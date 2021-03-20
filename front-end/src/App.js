import './App.css';
import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import MainNav from './auxiliary/NavBar/MainNav'
import Loginpage from './login_signup/Loginpage'
import Home from './home/Home';
import Community from './community/Community';
import Me from './me/Me';
import Search from './search/Search'
import Showcase from './auxiliary/Showcase'
import Commented_List from './community/Commented_List'
import Liked_List from './community/Liked_List'
import SearchResult from './search/SearchResult';
import Followings from './me/Followings'
import Followers from './me/Followers'
import My_Comment_History_List from './me/My_Comment_History_List'
import Signup from './login_signup/Signuppage'
import PostDetail from './home/PostDetail'

function App() {
  return (
    <>
      <div>

        <Router>
          <Switch>
          <Route path = "/login"> 
              <Loginpage />
            </Route>

            <Route path = "/signup"> 
              <Signup />
            </Route>

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

            <Route path = "/my_comment_history">
              <My_Comment_History_List />
            </Route>


            <Route path = "/components_showcase">
              <Showcase />
              <MainNav />
            </Route>
          

            <Route path = "/comments">
              <Commented_List />
            </Route>
            <Route path = "/likes">
              <Liked_List />
            </Route>

            <Route path = "/searchResult">
              <SearchResult />
            </Route>

            <Route path = "/followings">
              <Followings />
            </Route>

            <Route path = "/followers">
              <Followers />
            </Route>

            <Route path = "/detail"> 
              <PostDetail />
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
