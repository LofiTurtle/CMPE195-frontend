import React, {useEffect, useState} from 'react';
import api from "../../Services/api.js";
import CommunityCard from "./CommunityCard.jsx";

const CommunityCardList = () => {
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    const fetchCommunities = async () => {
      const { communities } = await api.getCommunities();
      setCommunities(communities);
    }
    fetchCommunities();
  }, []);

  return (
    <div
      className={"flex justify-center"}
    >
      <div
        className="max-w-xl"
      >
        <h1>All Communities:</h1>
        <ul
          className="border rounded w-96 "
        >
          {communities.map(community => (
            <li
              key={community.id}
              className={"border-b last:border-b-0"}
            ><CommunityCard community={community}/></li>
          ))}
        </ul>
      </div>
    </div>
  )
    ;
};

export default CommunityCardList;