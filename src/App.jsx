import './App.css';
import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import Post from './Components/post/Post';
import React from 'react';
import styled from "styled-components";
import { AccountBox } from "./Components/accountBox";
import Community from './Components/post/Community';
import PostForm from './Components/post/PostForm';
import UserProfile from './Components/user/UserProfile';
import GameSearch from './Components/post/GameSearch';
import CreateCommunity from './Components/post/CreateCommunity';
import CommunityMemberList from './Components/post/CommunityMemberList';

import TestFollowing from './Components/tests/TestFollowing';
import UserFollowerList from './Components/user/UserFollowerList';
import UserFollowingList from './Components/user/UserFollowingList';
import TestSearch from './Components/tests/TestSearch';
import NavbarWrapper from "./Components/Navbar/NavbarWrapper.jsx";
import EditProfileForm from './Components/accountBox/EditProfileForm.jsx';
import CommunityCardList from "./Components/post/CommunityCardList.jsx";
import AllUserCardList from "./Components/user/AllUserCardList.jsx";


const AppContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function App() {

  return (

      <Router>
 

        <Routes>
          <Route path="/login" element={<AppContainer><AccountBox/></AppContainer>}/>

          <Route element={<NavbarWrapper />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/posts/:postId" element={<Post />} />
            <Route path="/community/:communityId" element={<Community />}></Route>
            <Route path="/community/:communityId/members" element={<CommunityMemberList />}></Route>
            <Route path="/create-post" element={<PostForm />}></Route>
            <Route path="/edit-profile" element={<EditProfileForm />}></Route>
            <Route path="/users/:userId" element={<UserProfile />}></Route>
            <Route path="/users/:userId/followers" element={<UserFollowerList />}></Route>
            <Route path="/users/:userId/following" element={<UserFollowingList />}></Route>
            <Route path="/" element={<Navigate replace to="/login" />} />
            <Route path="/game-search" element={<GameSearch />} />
            <Route path="/create-community/:gameId" element={<CreateCommunity />} />
            <Route path="/community" element={<CommunityCardList />} />
            <Route path="/users" element={<AllUserCardList />} />

            <Route path='/tests/search' element={<TestSearch />} />
            <Route path='/tests/following' element={<TestFollowing />} />
          </Route>
        </Routes>
      </Router>
  )
}

export default App
