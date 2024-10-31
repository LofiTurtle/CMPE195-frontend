import React, { useState } from 'react';
import api from '../../Services/api';

const TestSearch = () => {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState('');

  const doSearch = async () => {
    console.log(await api.search(query, searchType));
  };

  return (
    <div>
      <input
        type='text'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder='Enter search query'
      />
      <input
        type='text'
        value={searchType}
        onChange={(e) => setSearchType(e.target.value)}
        placeholder='Enter "user" or "community"'
      />
      <button onClick={doSearch}>Search</button>
      <p>Check the console for search results object</p>
    </div>
  )
}

export default TestSearch;