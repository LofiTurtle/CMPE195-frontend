import React, { useEffect, useState } from 'react';
import SteamLoginIcon from '../assets/login-steam.png'
import './Dashboard.css'

const Dashboard = () => {
    return (
        <div className="steamAuth">
            <a
            className="App-link"
            href="http://localhost:8080/api/steamlogin"
            target="_self"
            rel="noopener noreferrer"
          >
            <img src={SteamLoginIcon} alt="Steam Login" />
          </a>
        </div>
    )
}

export default Dashboard;