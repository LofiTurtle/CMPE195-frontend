import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../Services/api';
import UserCardList from '../user/UserCardList';

const UserFollowerList = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({username: 'Loading...'});
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      const { user } = await api.getUser(userId);
      setUser(user);
    }
    getUser();

    const getUserFollowers = async () => {
      const { users } = await api.getFollowers(userId);
      setUsers(users);
    };
    getUserFollowers();
  }, []);

  return (
    <div>
      <h1 onClick={() => navigate(`/users/${userId}`)}>{user.name} Followers:</h1>
      <UserCardList users={users} />
    </div>
  )
}

export default UserFollowerList;