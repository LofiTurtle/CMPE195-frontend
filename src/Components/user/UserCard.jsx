import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserCard = ({ user }) => {
  const navigate = useNavigate();

  const handleSelect = () => {
    navigate(`/users/${user.id}`);
  }

  return (
    <button
      onClick={() => handleSelect()}
      className="w-full p-2 text-left hover:bg-gray-100"
    >
      <div className="flex gap-2">
          <img
            src={`/api/users/${user.id}/profile-picture`}
            alt=""
            className="w-10 h-10 object-cover rounded flex-shrink-0"
          />
        <div className="min-w-0 flex-1">
          <div className="font-medium truncate">{user.username}</div>
          <div className="text-sm text-gray-600 truncate">{user.profile.bio}</div>
        </div>
      </div>
    </button>
  )
}

export default UserCard;