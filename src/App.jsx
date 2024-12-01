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
import UserFollowerList from './Components/user/UserFollowerList';
import UserFollowingList from './Components/user/UserFollowingList';
import NavbarWrapper from "./Components/Navbar/NavbarWrapper.jsx";
import EditProfileForm from './Components/accountBox/EditProfileForm.jsx';
import CommunityCardList from "./Components/post/CommunityCardList.jsx";
import AllUserCardList from "./Components/user/AllUserCardList.jsx";
// import Sidebar from './Components/Navbar/sidebar.jsx'; 

const AppContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

// New styled component for the layout
const MainLayout = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  
`;

const ContentArea = styled.div`
  flex: 1;
  
  @media (max-width: 768px) {
    margin-left: 200px;
  }
`;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={
          <AppContainer>
            <AccountBox/>
          </AppContainer>
        }/>
        
        {/* Wrap protected routes with MainLayout */}
        <Route element={
          <MainLayout>
            {/*<Sidebar /> */}
            <ContentArea>
              <NavbarWrapper />
            </ContentArea>
          </MainLayout>
        }>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/posts/:postId" element={<Post />} />
          <Route path="/community/:communityId" element={<Community />} />
          <Route path="/community/:communityId/members" element={<CommunityMemberList />} />
          <Route path="/create-post" element={<PostForm />} />
          <Route path="/edit-profile" element={<EditProfileForm />} />
          <Route path="/users/:userId" element={<UserProfile />} />
          <Route path="/users/:userId/followers" element={<UserFollowerList />} />
          <Route path="/users/:userId/following" element={<UserFollowingList />} />
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route path="/game-search" element={<GameSearch />} />
          <Route path="/create-community/:gameId" element={<CreateCommunity />} />
          <Route path="/community" element={<CommunityCardList />} />
          <Route path="/users" element={<AllUserCardList />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;