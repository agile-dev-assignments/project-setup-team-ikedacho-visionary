import './App.css';
import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import MainNav from './auxiliary/NavBar/MainNav'
import Loginpage from './login_signup/Loginpage'
import Home from './home/Home';
import Edit from './home/Edit';
import Repost from "./home/Repost";
import Community from './community/Community';
import Me from './me/Me';
import Search from './search/Search'
import Showcase from './auxiliary/Showcase'
import Mentions_List from "./community/Mentions_List";
import Commented_List from './community/Commented_List'
import Liked_List from './community/Liked_List'
import SearchResult from './search/SearchResult';
import Followings from './me/Followings'
import Followers from './me/Followers'
import Friend_Suggestion from './me/Friend_Suggestion'
import Browse_History from './me/Browse_History'
import My_Comment_History_List from './me/My_Comment_History_List'
import My_Liked_List from './me/Liked_List'
import Signup from './login_signup/Signuppage'
import PostDetail from './home/PostDetail'
import Settings from './me/Settings'
import MyProfile from './me/MyProfile'
import FriendProfile from './me/FriendProfile'
import Prelogin from './Prelogin/Prelogin'
import Prehomenav from './Prelogin/PreNav/Pre_HomeNav'
import PreMainNav from './Prelogin/PreNav/Pre_MainNav'
import Pre_Recommended from './Prelogin/Pre_Recommended'
import Pre_Recent  from './Prelogin/Pre_RecentlyVisited'
import Floatingbutton from "./auxiliary/FloatingButton"
import Chat from './community/Chat'
import NewChat from './community/NewChat';
import ToFacebook from './me/ToFacebook'
import ToTwitter from './me/ToTwitter'
import ToInstagram from './me/ToInstagram'
import About from './me/about'

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

            <Route path='/to_facebook'>
              <ToFacebook />
            </Route>


            <Route path='/to_twitter'>
              <ToTwitter />
            </Route>

            <Route path='/to_instagram'>
              <ToInstagram />
            </Route>

            <Route path = "/my_comment_history">
              <My_Comment_History_List />
            </Route>

            <Route path = "/liked">
              <My_Liked_List />
            </Route>


            <Route path = "/components_showcase">
              <Showcase />
              <MainNav />
            </Route>

            <Route path = "/mentions">
              <Mentions_List />
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

            <Route path = "/chat">
              <Chat />
            </Route>

            <Route path = "/create_new_chat">
              <NewChat />
            </Route>

            <Route path = "/friend_profile">
              <FriendProfile />
            </Route>


            <Route path = "/detailpost">
              <PostDetail />
            </Route>

            <Route path = "/settings">
              <Settings />
            </Route>

            <Route path = "/edit_new_post">
              <Edit />
            </Route>

            <Route path = "/repost">
              <Repost />
            </Route>

            <Route path = "/about">
              <About />
            </Route>

            <Route path = "/prelogin">
            <Floatingbutton/>
            <Prelogin />
                <PreMainNav />
                <Prehomenav />
            </Route>

            <Route path = "/prerecommend">
            <Floatingbutton/>
            <Pre_Recommended />

                <PreMainNav />
                <Prehomenav />
            </Route>

            <Route path = "/prerecent">
            <Floatingbutton/>
            <Pre_Recent />

                <MainNav />
                <Prehomenav />


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
