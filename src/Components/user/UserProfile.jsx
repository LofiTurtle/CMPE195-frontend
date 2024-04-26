import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const UserProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`/api/users/${userId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Error fetching user');
      }
      return response.json();
    })
    .then((data) => {
      setUser(data.data)
    })
    .catch(() => {
      console.log('Error fetching user');
    });
  }, [])

  if (!user) {
    return (
      <h1>Loading user...</h1>
    )
  }

  return (
    <div>
      <h1>{user.username}</h1>
      <h2>Bio:</h2>
      <p>{user.profile.bio}</p>
      <br />
      {user.connected_accounts.map((account, index) => (
        <div key={index}>
          <p>Platform: {account.provider}</p>
          <p>Account Username: {account.username}</p>
        </div>
      ))}
    </div>
  );
}

export default UserProfile;