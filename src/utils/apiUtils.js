import { getValidToken } from './tokenStorage'

export function authenticatedFetch(url, options = {}) {
  // Equivalent to regular fetch(), but adds the Authorization header to access protected API routes
  const accessToken = getValidToken();

  // Use provided headers or default to empty object
  const headers = new Headers(options.headers || {});
  headers.append('Authorization', `Bearer ${accessToken}`)

  // Create new options object with the modified headers
  const authenticatedOptions = {...options, headers};

  return fetch(url, authenticatedOptions);
}