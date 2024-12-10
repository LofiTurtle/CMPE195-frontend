import {useEffect, useState} from 'react';
import api from "../../Services/api.js";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchUser} from "../slices/userSlice.js";
import RatingRow from "./RatingRow.jsx";

const RatingForm = () => {
  const { userId } = useParams();
  const { currentUser, status } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [ratings, setRatings] = useState([]);
  const [description, setDescription] = useState('');
  const [receivingUser, setReceivingUser] = useState(false);
  const [showMissingRatingError, setShowMissingRatingError] = useState(false);

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

  const updateRatingValue = (name, value) => {
    setRatings(ratings.map(x => x.name === name ? { name, value } : x));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (ratings.some(rating => rating.value === null)) {
      setShowMissingRatingError(true);
      return
    }
    setShowMissingRatingError(false);

    await api.createRating(userId, description, ratings);
    navigate(`/users/${userId}/ratings`);
  }

  if (ratings.length === 0) {
    return <p>Loading...</p>
  }

  return (
    <div className={'flex justify-center'}>
      <div className={'w-full max-w-fit mx-auto p-4'}>
        <h1>Rate {receivingUser.username}</h1>
        <form onSubmit={handleSubmit}>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={`Describe your experience with ${receivingUser.username}`}
          rows={4}
          cols={30}
          required
        />
          {ratings.map(rating => (
            <div key={rating.name}>
              <RatingRow label={rating.name} value={rating.value} onChange={(value) => updateRatingValue(rating.name, value + 1)}
                         readOnly={false}/>
            </div>
          ))}
          {showMissingRatingError && (<p className={'text-red-600'}>All fields are required</p>)}
          <button type="submit">Submit rating</button>
        </form>
      </div>
    </div>
  )
}

export default RatingForm