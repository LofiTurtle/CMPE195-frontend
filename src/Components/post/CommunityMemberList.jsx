import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../Services/api';
import UserCardList from '../user/UserCardList';

const CommunityMemberList = () => {
  const { communityId } = useParams();
  const navigate = useNavigate();

  const [community, setCommunity] = useState({name: 'Loading...', num_users: 0});
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getCommunity = async () => {
      const { community } = await api.getCommunity(communityId);
      setCommunity(community);
    }
    getCommunity();

    const getCommunityMembers = async () => {
      const { users } = await api.getCommunityUsers(communityId);
      setUsers(users);
    };
    getCommunityMembers();
  }, []);

  return (
    <div
      className={"flex justify-center"}
    >
      <div
        className="max-w-xl"
      >
        <h1 onClick={() => navigate(`/community/${communityId}`)}>{community.name} Members:</h1>
        <UserCardList users={users}/>
      </div>
    </div>
  )
}

export default CommunityMemberList;