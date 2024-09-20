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
};

export default api;
