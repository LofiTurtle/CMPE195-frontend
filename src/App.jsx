import './App.css'
import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';
import Dashboard from './Components/Dashboard'
import React from 'react';
import styled from "styled-components";
import { AccountBox } from "./Components/accountBox";



const AppContainer = styled.div`
  width: 100%;
  height: 150%;
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
          {/* <PrivateRoute path="/dashboard" component={<Dashboard/>} /> */} 
          <Route
          path="/dashboard"
          element={
            <Dashboard/>
          }
        />
          <Route path="/" element={<Navigate replace to="/login" />} />
        </Routes>
      </Router>
  )
}

export default App
