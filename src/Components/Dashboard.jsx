import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SteamLoginIcon from '../assets/login-steam.png'
import './Dashboard.css'
import { deleteTokens } from '../utils/tokenStorage';
import { authenticatedFetch } from '../utils/apiUtils'

const Dashboard = () => {
  const [message, setMessage] = useState('Loading...');
  const navigate = useNavigate();

  const logout = async () => {
    deleteTokens();
    navigate('/')
  }

  useEffect(() => {
    const fetchMe = async () => {
      authenticatedFetch('/api/me')
      .then(response => {
        if (response.status != 200) {
          navigate('/login');
        } else {
          return response.json();
        }
      })
      .then(data => setMessage(`Hello ${data.username}`))
    };

    fetchMe();
  }, []);

    return (
      <div>
        <h1>{message}</h1>
        <button onClick={logout}>Log out</button>
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
        </div>
    )
}

export default Dashboard;