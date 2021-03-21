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
import Friend_Suggestion from './me/Friend_Suggestion'
import Browse_History from './me/Browse_History'
import My_Comment_History_List from './me/My_Comment_History_List'
import Signup from './login_signup/Signuppage'
import PostDetail from './home/PostDetail'
import Settings from './me/Settings'
import MyProfile from './me/MyProfile'
import Prelogin from './Prelogin/Prelogin'


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
            <page>
                <Search />
              </page>
              <navigator>
                <MainNav />
              </navigator>
            </Route>

            <Route path = "/community">
            <page>
                <Community />
              </page>
              <navigator>
                <MainNav />
              </navigator>
            </Route>

            <Route path = "/me">
              <page>
                <Me />
              </page>
              <navigator>
                <MainNav />
              </navigator>
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

            <Route path = "/friend_suggestion">
              <Friend_Suggestion />
            </Route>            

            <Route path = "/browse_history">
              <Browse_History />
            </Route> 

            <Route path = "/my_profile">
              <MyProfile />
            </Route> 



            <Route path = "/detailpost"> 
              <PostDetail />
            </Route>

            <Route path = "/settings">
              <Settings />
            </Route>

            <Route path = "/prelogin">
            <page>
            <Prelogin />
              </page>
              <navigator>
                <MainNav />
              </navigator>

            </Route>

            <Route path = "/"> 
              <page>
                <Home />
              </page>
              <navigator>
                <MainNav />
              </navigator>
            </Route>

          </Switch>
        </Router>
      </div>
    </>
  );
}

export default App;
