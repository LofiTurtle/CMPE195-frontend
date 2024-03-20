export function setAccessToken(accessToken) {
  localStorage.setItem('jwt-token', accessToken);
}

export function setRefreshToken(refreshToken) {
  localStorage.setItem('jwt-refresh-token', refreshToken);
}

export function deleteTokens() {
  localStorage.removeItem('jwt-token');
  localStorage.removeItem('jwt-refresh-token');
}

function isTokenExpired(tolerance = 600) {
  // tolerance is how long (in seconds) a token must have before its expiration time to not be considered expired
  const token = localStorage.getItem('jwt-token');
  const expiration = JSON.parse(atob(token.split('.')[1])).exp;
  const currentTime = Math.floor(Date.now() / 1000);
  return currentTime > expiration - tolerance;
}

function refreshToken() {
  // Refreshes the access token
  fetch("/auth/refresh", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt-refresh-token')}`
    }
  })
  .then(response => response.json())
  .then(data => {
    setAccessToken(data.access_token)
  })
  .catch(() => console.log('failed register fetch'));
}

export function getValidToken() {
  // Gets valid access token, refreshing if necessary
  if (isTokenExpired()) {
    refreshToken();
  }
  return localStorage.getItem('jwt-token');
}