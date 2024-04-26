import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SteamLoginIcon from '../assets/login-steam.png';
import PostForm  from './post/PostForm';
import PostList from './post/PostList';
import './Dashboard.css'

const Dashboard = () => {
  const [message, setMessage] = useState('Loading...');
  const navigate = useNavigate();

  const logout = async () => {
    fetch('/api/logout', { method: 'POST' })
      .then(response => {
        if (response.status != 200) {
          throw new Error();
        }
      })
      .then(() => navigate('/'))
      .catch(() => console.log('Error logging out.'))
  }

  useEffect(() => {
    const fetchMe = async () => {
      fetch('/api/me')
        .then(response => {
          if (response.status != 200) {
            throw new Error();
          } else {
            return response.json();
          }
        })
        .then(data => setMessage(`Hello ${data.username}`))
        .catch(() => navigate('/login'));
    };

    fetchMe();
  }, []);

  return (
    <div>
      <h1>{message}</h1>
      <h2>Recent posts from your communities:</h2>
      <PostList communityId={1}></PostList>
      {/* TODO post list for all followed communities */}
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