import {useEffect, useState} from 'react';
import api from "../../Services/api.js";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchUser} from "../slices/userSlice.js";

const RatingForm = () => {
  const { userId } = useParams();
  const { currentUser, status } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [ratings, setRatings] = useState([]);
  const [description, setDescription] = useState('');
  const [receivingUser, setReceivingUser] = useState(false);

  useEffect(() => {
    const getRatingFields = async () => {
      if (status === 'idle') {
        dispatch(fetchUser());
      }
      if (userId == null || currentUser == null) {
        // Don't fetch if either userId or currentUser is null or undefined
        return
      }
      try {
        const { rating } = await api.getRating(currentUser?.id, userId);
        setRatings(rating.fields);
        setDescription(rating.description);
      } catch (error) {
        // No existing rating, so fetch blank fields
        const { fields } = await api.getRatingFields();
        setRatings(fields.map((field) => ({name: field, value: null})));
      }
    };
    getRatingFields();
  }, [currentUser, currentUser?.id, userId, status, dispatch])

  useEffect(() => {
    const getReceivingUser = async () => {
      const { user } = await api.getUser(userId);
      setReceivingUser(user);
    };
    getReceivingUser();
  }, [userId]);

  const caps = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const updateRatingValue = (name, value) => {
    setRatings(ratings.map(x => x.name === name ? { name, value } : x));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    await api.createRating(userId, description, ratings);
    navigate(`/users/${userId}/ratings`);
  }

  if (ratings.length === 0) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <h1>Rate {receivingUser.username}</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={`Describe your experience with ${receivingUser.username}`}
          rows={4}
          cols={50}
          required
        />
        {ratings.map(rating => (
          <div key={rating.name}>
            <label htmlFor={rating.name} className={'inline-block min-w-40'}>{caps(rating.name)}</label>
            <input
              type="number"
              min="1"
              max="5"
              id={rating.name}
              value={rating.value}
              onChange={(e) => updateRatingValue(rating.name, e.target.value)}
              required
            />
          </div>
        ))}
        <button type="submit">Submit rating</button>
      </form>
    </div>
  )
}

export default RatingForm