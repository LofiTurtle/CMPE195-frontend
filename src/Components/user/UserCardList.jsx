import React from 'react';
import UserCard from './UserCard';

const UserCardlist = ({ users }) => {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}><UserCard user={user}/></li>
      ))}
    </ul>
  );
};

export default UserCardlist;