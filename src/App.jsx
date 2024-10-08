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
import { Navbar } from './Components/Navbar/Navbar';

import TestFollowing from './Components/tests/TestFollowing';


const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function App() {

  return (

      <Router>
 
        <Navbar/>
        
        <Routes>
          <Route path="/login" element={<AppContainer><AccountBox/></AppContainer>}/>
          {/* <PrivateRoute path="/dashboard" component={<Dashboard/>} /> */} 
          <Route element={<Navbar></Navbar>}/>
       
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/posts/:postId" element={<Post />} />
          <Route path="/community/:communityId" element={<Community />}></Route>
          <Route path="/community/:communityId/create-post" element={<PostForm />}></Route>
          <Route path="/users/:userId" element={<UserProfile />}></Route>
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route path='/tests/test-following' element={<TestFollowing />} />
        </Routes>
      </Router>
  )
}

export default App
