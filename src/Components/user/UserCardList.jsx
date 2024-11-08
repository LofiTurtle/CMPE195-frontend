import React from 'react';
import UserCard from './UserCard';

const UserCardlist = ({ users }) => {
  return (
    <ul
      className="border rounded w-96 "
    >
      {users.map(user => (
        <li
          key={user.id}
          className={"border-b last:border-b-0"}
        ><UserCard user={user}/></li>
      ))}
    </ul>
  );
};

export default UserCardlist;