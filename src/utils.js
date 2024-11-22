import api from "./Services/api";

function hasDiscordAccount(user) {
  return user?.connected_accounts?.some(obj => obj.provider == "Discord") || false;
}

export { hasDiscordAccount }