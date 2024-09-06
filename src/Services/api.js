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
    const response = await axiosApi.get(`/community/${communityId}`);
    return response.data;
  },

  getCommunityPosts: async (communityId) => {
    const response = await axiosApi.get(`/community/${communityId}/posts`);
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

  createPost: async (title, content, communityId) => {
    const response = await axiosApi.post('/posts', {
      title,
      content,
      community_id: communityId
    });
    return response.data;
  },

  createComment: async (content, authorId, postId) => {
    const response = await axiosApi.post('/comments', {
      content,
      author_id: authorId,
      post_id: postId
    });
    return response.data;
  },
};

export default api;