const API_BASE_URL = '/api';

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json();
    console.error('API Error:', errorData);
    throw new Error(errorData.message || 'API Error');
  }
  return response.json();
};

const api = {
  getMe: async () => {
    const response = await fetch(`${API_BASE_URL}/me`, { credentials: 'include' });
    return handleResponse(response);
  },

  getUser: async (userId) => {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, { credentials: 'include' });
    return handleResponse(response);
  },

  getUserPosts: async (userId) => {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/posts`, { credentials: 'include' });
    return handleResponse(response);
  },

  getCommunity: async (communityId) => {

    const response = await fetch(`${API_BASE_URL}/community/${communityId}`, { credentials: 'include' });
    return handleResponse(response);
  },

  getCommunityPosts: async (communityId) => {
    const response = await fetch(`${API_BASE_URL}/community/${communityId}/posts`, { credentials: 'include' });
    return handleResponse(response);
  },

  getHomepage: async () => {
    const response = await fetch(`${API_BASE_URL}/homepage`, { credentials: 'include' });
    return handleResponse(response);
  },

  getPost: async (postId) => {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}`, { credentials: 'include' });
    return handleResponse(response);
  },

  createPost: async (title, content, communityId, image) => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('community_id', communityId);
    if (image) {
      formData.append('image', image);
    }
    const response = await fetch(`${API_BASE_URL}/posts`, {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });
    return handleResponse(response);
  },

  createComment: async (content, postId) => {
    const response = await fetch(`${API_BASE_URL}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content, post_id: postId }),
      credentials: 'include',
    });
    return handleResponse(response);
  },

  likePost: async (postId) => {
    const response = await axiosApi.post(`/posts/${postId}/like`);
    return response.data;
  },

  getFollowers: async (userId) => {
    const response = await axiosApi.get(`/users/${userId}/followers`);
    return response.data;
  },

  getFollowing: async (userId) => {
    const response = await axiosApi.get(`/users/${userId}/following`);
    return response.data;
  },

  followUser: async (userId) => {
    await axiosApi.post(`/users/${userId}/follow`);
  },

  unfollowUser: async (userId) => {
    await axiosApi.delete(`/users/${userId}/follow`);
  },

  getRelationship: async (userId) => {
    // Return the follower/following relationship between the current user and userId
    // Response format: {following: boolean, followed_by: boolean}
    const response = await axiosApi.get(`/users/${userId}/relationship`);
    return response.data;
  },

  getUserCommunities: async (userId) => {
    // Return the communities a user follows
    const response = await axiosApi.get(`/users/${userId}/communities`);
    return response.data;
  },

  getCommunityUsers: async (communityId) => {
    // Return the users who follow a community
    const response = await axiosApi.get(`/communities/${communityId}/users`);
    return response.data;
  },
  
  followCommunity: async (communityId) => {
    await axiosApi.post(`/communities/${communityId}/follow`);
  },

  unfollowCommunity: async (communityId) => {
    await axiosApi.delete(`/communities/${communityId}/follow`);
  },

  createCommunity: async (gameId, communityName) => {
    const response = await axiosApi.post(`/communities`, {
      game_id: gameId,
      community_name: communityName
    });
    return response.data;
  },

  gameSearchResults: async (query) => {
    const response = await axiosApi.get(`/game-search`, { params: {
      q: query
    }});
    return response.data;
  },

  gameInfo: async (gameId) => {
    const response = await axiosApi.get(`/game-info/${gameId}`);
    return response.data;
  }
};

export default api;
