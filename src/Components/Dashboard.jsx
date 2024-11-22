import { Link } from 'react-router-dom';
import PostList from './post/PostList';
import './Dashboard.css';
import {useDispatch, useSelector} from 'react-redux';
import {fetchUser} from "./slices/userSlice.js";
import {useEffect} from "react";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { currentUser, status, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (status === 'idle') {
    dispatch(fetchUser());
    }
  }, [dispatch, status]);

  if (status === 'loading' || currentUser === null) {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='main-content'>
      <h1>Welcome, {currentUser.username}</h1>
      {currentUser.username && <Link to={`/users/${currentUser.id}`}>View your profile</Link>}
      <h2>Recent posts from your communities:</h2>
      <PostList homepage={true}></PostList>
    </div>
  );
};

export default Dashboard;