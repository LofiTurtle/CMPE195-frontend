import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { hasDiscordAccount, getCurrentUserId } from '../../utils';
import api from '../../Services/api';

const UserProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [showDiscordLinkButton, setShowDiscordLinkButton] = useState(false);
  const [showDiscordDisconnectButton, setShowDiscordDisconnectButton] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const { user } = await api.getUser(userId);
      setUser(user);
    }
    getUser();
  }, [userId])

  useEffect(() => {
    const checkDiscordLinkButton = async () => {
      const currentUserId = await getCurrentUserId();
      setShowDiscordLinkButton((user?.id === currentUserId || false) && !hasDiscordAccount(user));
    };

    const checkDiscordDisconnectButton = async () => {
      const currentUserId = await getCurrentUserId();
      setShowDiscordDisconnectButton((user?.id === currentUserId || false) && hasDiscordAccount(user));
    }
  
    checkDiscordLinkButton();
    checkDiscordDisconnectButton();
  }, [user]);

  const handleDiscordDisconnect = () => {
    fetch('/api/discord/disconnect', {method: 'POST'})
    .then(response => {
      if (!response.ok) {
        throw new Error('Error disconnecting Discord account');
      }
      console.log('Disconnected from Discord');
      navigate(0);  // refresh the page
    })
    .catch(error => console.log(error));
  }

  if (!user) {
    return (
      <h1>Loading user...</h1>
    )
  }

  return (
    <div>
      <Link to={'/dashboard'}>Go to Dashboard</Link>
      <h1>{user.username}</h1>
      <h2>Bio:</h2>
      <p>{user.profile.bio}</p>
      <br />
      {user.connected_accounts.map((account, index) => (
        <div key={index} style={{border: '1px solid black', padding: '10px'}}>
          <img src={account.profile_picture_url} alt="" />
          <p>Platform: {account.provider}</p>
          <p>Account Username: {account.username}</p>
        </div>
      ))}
      <br />
      {showDiscordLinkButton && (
      <a href="/api/discord/connect">
        Link your discord account
      </a>
      )}
      {showDiscordDisconnectButton && (
        <button onClick={handleDiscordDisconnect}>Disconnect Discord Account</button>
      )}
    </div>
  );
}

export default UserProfile;