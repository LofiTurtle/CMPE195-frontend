async function getCurrentUserId() {
  const response = await fetch('/api/me');
  if (!response.ok) {
    // Probably just not logged in, return -1 for user id
    return -1;
  }
  const data = await response.json();
  return data.id;
}

function hasDiscordAccount(user) {
  return user?.connected_accounts?.some(obj => obj.provider == "Discord") || false;
}

export { getCurrentUserId, hasDiscordAccount }