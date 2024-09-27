import React, { useState } from 'react';
import api from '../../Services/api';

const ApiTestComponent = () => {
  const [userId, setUserId] = useState('');
  const [communityId, setCommunityId] = useState('');

  const handleApiCall = async (apiMethod, ...args) => {
    try {
      const result = await apiMethod(...args);
      console.log(`API call result:`, result);
    } catch (error) {
      console.error(`API call error:`, error);
    }
  };

  return (
    <div className="p-4 space-y-4" style={{display: "block"}}>
      <br />
      <br />
      <h1 className="text-2xl font-bold">API Test Component</h1>
      
      <div className="space-y-2">
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Enter User ID"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          value={communityId}
          onChange={(e) => setCommunityId(e.target.value)}
          placeholder="Enter Community ID"
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="space-y-2">
        <button
          onClick={() => handleApiCall(api.getFollowers, userId)}
        >
          Get Followers
        </button>
        <br />
        <button
          onClick={() => handleApiCall(api.getFollowing, userId)}
        >
          Get Following
        </button>
        <br />
        <button
          onClick={() => handleApiCall(api.followUser, userId)}
        >
          Follow User
        </button>
        <br />
        <button
          onClick={() => handleApiCall(api.unfollowUser, userId)}
        >
          Unfollow User
        </button>
        <br />
        <button
          onClick={() => handleApiCall(api.getRelationship, userId)}
        >
          Get Relationship
        </button>
        <br />
        <button
          onClick={() => handleApiCall(api.getUserCommunities, userId)}
        >
          Get User Communities
        </button>
        <br />
        <button
          onClick={() => handleApiCall(api.getCommunityUsers, communityId)}
        >
          Get Community Users
        </button>
        <br />
        <button
          onClick={() => handleApiCall(api.followCommunity, communityId)}
        >
          Follow Community
        </button>
        <br />
        <button
          onClick={() => handleApiCall(api.unfollowCommunity, communityId)}
        >
          Unfollow Community
        </button>
      </div>
    </div>
  );
};

export default ApiTestComponent;