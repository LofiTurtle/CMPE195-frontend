import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../Services/api';

const GameSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = await api.gameSearchResults(query);
      console.log(data.games);
      setResults(data.games);
    } catch (error) {
      console.error('Error searching for games:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResultClick = (gameId) => {
    navigate(`/create-community/${gameId}`);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for games..."
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <button
          type="submit"
          className="mt-2 w-full px-4 py-2 text-white rounded-md"
style={{ backgroundColor: 'var(--secondary-bg)' }}
        >
          Search
        </button>
      </form>

      {isLoading && <p className="text-center">Loading...</p>}

      <div className="space-y-4">
        {results.map((game) => (
          <div
            key={game.id}
            onClick={() => handleResultClick(game.id)}
            className="cursor-pointer border border-gray-300 rounded-md overflow-hidden hover:shadow-md transition-shadow flex"
          >
            <img
              src={game.cover}
              alt={game.name}
              className="w-24 h-24 object-cover"
            />
            <div className="p-4 flex-grow">
              <h3 className="font-bold text-lg mb-2">{game.name}</h3>
              <p className="text-sm text-gray-600">
                Release Date: {new Date(Date.parse(game.first_release_date)).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameSearch;