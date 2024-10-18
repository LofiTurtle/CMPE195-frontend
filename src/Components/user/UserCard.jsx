import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserCard = ({ user }) => {
  const navigate = useNavigate();
  console.log(user);

  return (
    <p onClick={() => navigate(`/users/${user.id}`)} style={{cursor: 'pointer'}}>{user.username}</p>
  )
}

export default UserCard;