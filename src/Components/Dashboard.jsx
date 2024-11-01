import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import SteamLoginIcon from '../assets/login-steam.png';
import PostForm  from './post/PostForm';
import PostList from './post/PostList';
import './Dashboard.css'
import api from '../Services/api';

const Dashboard = () => {
  const [message, setMessage] = useState('Loading...');
  const [user, setUser] = useState(null);
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

  useEffect(() =>{
    const getMe = async () => {
      const { user } = await api.getMe();
      setMessage(`Hello ${user.username}`);
      setUser(user);
    };

    getMe();
  }, [navigate]);

  if (!user) {
    return (
      <h2>Loading...</h2>
    )
  }

  return (
    <div className='main-content'>
      <h1>{message}</h1>
      <Link to={`/users/${user.id}`}>View your profile</Link>
      <h2>Recent posts from your communities:</h2>
      <PostList homepage={true}></PostList>
      {/* TODO post list for all followed communities */}
      
      {/* <div className="steamAuth">
        <a
          className="App-link"
          href="http://localhost:8080/api/steamlogin"
          target="_self"
          rel="noopener noreferrer"
        >
          <img src={SteamLoginIcon} alt="Steam Login" />
        </a>
      </div> */}
    </div>
  )
}

export default Dashboard;