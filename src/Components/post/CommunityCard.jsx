import React from 'react';
import { useNavigate } from 'react-router-dom';

const CommunityCard = ({ community }) => {
  const navigate = useNavigate();

  const handleSelect = () => {
    navigate(`/community/${community.id}`);
  }

  return (
    <button
      onClick={() => handleSelect()}
      className="w-full p-2 text-left hover:bg-gray-100"
    >
      <div className="flex gap-2">
          <img
            src={community.game.cover}
            alt=""
            className="w-10 h-10 object-cover rounded flex-shrink-0"
          />
        <div className="min-w-0 flex-1">
          <div className="font-medium truncate">{community.name}</div>
          <div className="text-sm text-gray-600 truncate">{community.game.name}</div>
        </div>
      </div>
    </button>
  )
}

export default CommunityCard;