import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './Community.css';
import PostList from './PostList';
import api from '../../Services/api';

const Community = () => {
  const { communityId } = useParams();

  const [community, setCommunity] = useState(null);
  const [isFollowing, setIsFollowing] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const getCommunity = async () => {
      const { community } = await api.getCommunity(communityId);
      setCommunity(community);
    }

    const getIsFollowing = async () => {
      const {user: currentUser} = await api.getMe();
      const { users } = await api.getCommunityUsers(communityId);
      setIsFollowing(users.map((x) => x.id).includes(currentUser.id));
    }

    getCommunity();
    getIsFollowing();
  }, [communityId])

  const toggleFollowCommunity = async () => {
    if (isFollowing) {
      await api.unfollowCommunity(community.id);
      setIsFollowing(false);
      setCommunity({ ...community, num_users: community.num_users - 1});
    } else {
      await api.followCommunity(community.id);
      setIsFollowing(true);
      setCommunity({ ...community, num_users: community.num_users + 1});
    }
  }

  if (!community) {
    return (
        <p>Loading...</p>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Hero section with game artwork */}
      <div className="relative mb-8 rounded-lg overflow-hidden">
        {community.game.artwork ? (
          <div className="w-full h-64">
            <img
              src={community.game.artwork}
              alt={community.game.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40" />
          </div>
        ) : (
          <div className="w-full h-64 bg-gray-200" />
        )}

        {/* Community name and action buttons overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h1 className="text-4xl font-bold mb-4 primary-text-inverted">{community.name}</h1>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleFollowCommunity}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                isFollowing
                  ? 'bg-white text-gray-900 hover:bg-gray-100'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              {isFollowing ? 'Unfollow' : 'Follow'} Community
            </button>
            <Link
              to="/create-post"
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 bg-opacity-50 hover:bg-opacity-70 rounded-md transition-colors"
            >
              Create Post
            </Link>
            <div
              className="flex items-end gap-2 px-4 py-2 ml-auto"
            >
              <div
                onClick={() => navigate(`/community/${communityId}/members`)}
                className="flex items-center gap-3 cursor-pointer"
              >
                <span className=" font-semibold">{community.num_users.toLocaleString()}</span>
                <span className=""> Community Members</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Game info */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-4">
            <h2 className="text-xl font-semibold mb-2">{community.game.name}</h2>
            <p className="text-gray-700">{community.game.summary}</p>
          </div>

      {/* Posts section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <PostList communityId={communityId} />
      </div>
    </div>
  );
}

export default Community;