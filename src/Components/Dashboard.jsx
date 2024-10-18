import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import SteamLoginIcon from '../assets/login-steam.png';
import PostForm  from './post/PostForm';
import PostList from './post/PostList';
import './Dashboard.css'
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from '../Components/slices/userSlice'; // Adjust the path if necessary


const Dashboard = () => {
  const dispatch = useDispatch();
  const { username, status, error } = useSelector((state) => state.user);



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
        if (response.status != 200) {
          throw new Error();
        }
      })
      .then(() => navigate('/'))
      .catch(() => console.log('Error logging out.'))
  }



  return (
    <div className='main-content'>
      <h1>{message}</h1>
      {user.username && <Link to={`/users/${user.username}`}>View your profile</Link>}
      <h2>Recent posts from your communities:</h2>
      <PostList communityId={1}></PostList>
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