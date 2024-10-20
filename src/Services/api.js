import axios from 'axios';

const API_BASE_URL = '/api';

const axiosApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

axiosApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('API Error:', error.response.data);
      return Promise.reject(error.response.data);
    } else if (error.request) {
      console.error('API Error: No response received');
      return Promise.reject(new Error('No response received from the server'));
    } else {
      console.error('API Error:', error.message);
      return Promise.reject(error);
    }
  }
);

const api = {
  getMe: async () => {
    const response = await axiosApi.get('/me');
    return response.data;
  },

  getUser: async (userId) => {
    const response = await axiosApi.get(`/users/${userId}`);
    return response.data;
  },

  getUserPosts: async (userId) => {
    const response = await axiosApi.get(`/users/${userId}/posts`);
    return response.data;
  },

  getCommunity: async (communityId) => {
    const response = await axiosApi.get(`/communities/${communityId}`);
    return response.data;
  },

  getCommunityPosts: async (communityId) => {
    const response = await axiosApi.get(`/communities/${communityId}/posts`);
    return response.data;
  },

  getHomepage: async () => {
    const response = await axiosApi.get('/homepage');
    return response.data;
  },

  getPost: async (postId) => {
    const response = await axiosApi.get(`/posts/${postId}`);
    return response.data;
  },

  createPost: async (title, content, communityId, image) => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('community_id', communityId);
    if (image) {
      formData.append('image', image);
    }
    const response = await axiosApi.post('/posts', formData, {headers: {'Content-Type': 'multipart/form-data'}});
    return response.data;
  },

  createComment: async (content, postId) => {
    const response = await axiosApi.post('/comments', {
      content,
      post_id: postId
    });
    return response.data;
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

  search: async (query, searchType) => {
    // searchType is either 'community' or 'user'
    const response = await axiosApi.get(`/search`, { params: {
      q: query,
      type: searchType
    }});
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