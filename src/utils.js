import api from "./Services/api";

async function getCurrentUserId() {
  try {
    const { user } = api.getMe();
    return user.id;
  } catch {
    // Probably just not logged in, return -1 for user id
    return -1
  }
}

function hasDiscordAccount(user) {
  return user?.connected_accounts?.some(obj => obj.provider == "Discord") || false;
}

export { getCurrentUserId, hasDiscordAccount }