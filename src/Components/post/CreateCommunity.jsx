import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../Services/api';

const CreateCommunity = () => {
  const [gameInfo, setGameInfo] = useState(null);
  const [communityName, setCommunityName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { gameId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGameInfo = async () => {
      try {
        const data = await api.gameInfo(gameId);
        setGameInfo(data.game);
      } catch (err) {
        setError('Failed to fetch game information');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGameInfo();
  }, [gameId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await api.createCommunity(gameId, communityName);
      navigate(`/community/${response.community.id}`);
    } catch (err) {
      setError('Failed to create community');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-center w-full">Create a new community</h1>
      {gameInfo && (
        <div className="mb-6 border border-gray-300 rounded-md overflow-hidden">
          <img
            src={gameInfo.artwork}
            alt={gameInfo.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-2">{gameInfo.name}</h2>
            <p className="text-sm text-gray-600 mb-2">
              Release Date: {new Date(Date.parse(gameInfo.first_release_date)).toLocaleDateString()}
            </p>
            <p className="text-sm">{gameInfo.summary}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="communityName" className="block text-sm font-medium text-gray-700">
            Community Name
          </label>
          <input
            type="text"
            id="communityName"
            value={communityName}
            onChange={(e) => setCommunityName(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300"
        >
          {isLoading ? 'Creating...' : 'Create Community'}
        </button>
      </form>
    </div>
  );
};

export default CreateCommunity;