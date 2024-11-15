import {useState, useEffect, useRef} from 'react';
import api from '../../Services/api';
import { useNavigate } from 'react-router-dom';

const searchTypes = [
  { id: 'communities', label: 'Communities', searchFn: async (term) => {
    const { communities } = await api.communitySearchResults(term);
    return communities.map((e) => ({id: e.id, name: e.name, description: e.game.name, image_url: e.game.cover}));
  } },
  { id: 'users', label: 'Users', searchFn: async (term) => {
    const { users } = await api.userSearchResults(term);
    return users.map((e) => ({id: e.id, name: e.username, description: e.profile.bio, image_url: `/api/users/${e.id}/profile-picture`}));
  } },
  { id: 'games', label: 'Games', searchFn: async (term) => {
    const { games } = await api.gameSearchResults(term);
    return games.map((e) => ({id: e.id, name: e.name, description: e.summary, image_url: e.cover}));
  } }
];

const SearchBox = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = useState(searchTypes[0]);
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();

  const dropdownRef = useRef(null);
  const searchBoxRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchTerm) {
        setLoading(true);
        try {
          const data = await selectedType.searchFn(searchTerm);
          setResults(data);
        } catch (err) {
          setResults([]);
        }
        setLoading(false);
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, selectedType]);

  useEffect(() => {
    // Handle clicking outside the search type dropdown
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        showDropdown
      ) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [showDropdown]);

  useEffect(() => {
    // Handle clicking outside the entire component
    const handleClickOutside = (event) => {
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(event.target)
      ) {
        clearFields();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (id) => {
    if (selectedType === searchTypes[0]) {
      navigate(`/community/${id}`);
    } else if (selectedType === searchTypes[1]) {
      navigate(`/users/${id}`);
    } else if (selectedType === searchTypes[2]) {
      navigate(`/create-community/${id}`);
    }
    clearFields();
  };

  const handleViewAll = () => {
    if (selectedType === searchTypes[0]) {
      navigate(`/community`);
    } else if (selectedType === searchTypes[1]) {
      navigate(`/users`);
    } else if (selectedType === searchTypes[2]) {
      navigate(`/create-community`);
    }
    clearFields();
  }

  const clearFields = () => {
    setSelectedType(searchTypes[0]);
    setSearchTerm('');
    setResults([])
  }

  return (
    <div className="w-full max-w-md relative" ref={searchBoxRef}>
      <div className="flex gap-2">
        {/* Search Type Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="px-3 py-2 border rounded bg-white w-40"
          >
            {selectedType.label} ▼
          </button>

          {showDropdown && (
            <div className="absolute mt-1 w-full bg-white border rounded shadow z-50">
              {searchTypes.map(type => (
                <button
                  key={type.id}
                  onClick={() => {
                    setSelectedType(type);
                    setShowDropdown(false);
                  }}
                  className="w-full px-3 py-2 text-left hover:bg-gray-100"
                >
                  {type.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Search Input */}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
          className="flex-1 px-3 py-2 border rounded"
        />

        {/*  "View all" button */}
        {selectedType !== searchTypes[2] && (
          <button
            onClick={handleViewAll}
            className="px-3 py-2 border rounded bg-white"
          >
            View all
          </button>
        )}
      </div>

      {/* Loading Indicator */}
      {loading && <div className="absolute top-full mt-2 text-gray-500">Loading...</div>}

      {/* Results */}
      {results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 border rounded bg-white shadow-lg max-h-96 overflow-y-auto z-40">
          {results.map(result => (
            <button
              key={result.id}
              onClick={() => handleSelect(result.id)}
              className="w-full p-2 text-left hover:bg-gray-100 border-b last:border-b-0"
            >
              <div className="flex gap-2">
                {result.image_url && (
                  <img
                    src={result.image_url}
                    alt=""
                    className="w-10 h-10 object-cover rounded flex-shrink-0"
                  />
                )}
                <div className="min-w-0 flex-1">
                  <div className="font-medium truncate">{result.name}</div>
                  <div className="text-sm text-gray-600 truncate">{result.description}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBox;