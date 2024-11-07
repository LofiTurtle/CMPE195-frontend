import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import SteamLoginIcon from '../assets/login-steam.png';
import PostForm from './post/PostForm';
import PostList from './post/PostList';
import './Dashboard.css';
import api from '../Services/api';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from '../Components/slices/userSlice'; // Adjust the path if necessary

const Dashboard = () => {
  const dispatch = useDispatch();
  const { userId, username, status, error } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUser()); // Dispatch the fetchUser action, to get the slices
  }, [dispatch]);



  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  const logout = async () => {
    fetch('/api/logout', { method: 'POST' })
      .then(response => {
        if (response.status !== 200) {
          throw new Error();
        }
      })
      .then(() => navigate('/'))
      .catch(() => console.log('Error logging out.'));
  };

  return (
    <div className='main-content'>
      <h1>Welcome, {username}</h1>
      {username && <Link to={`/users/${userId}`}>View your profile</Link>}
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
  );
};

export default Dashboard;