import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import api from "../../Services/api.js";
import Rating from "./Rating.jsx";
import {useDispatch, useSelector} from "react-redux";
import {fetchUser} from "../slices/userSlice.js";

const RatingList = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.user);

  const [receivingUser, setReceivingUser] = useState(false);
  const [ratings, setRatings] = React.useState([]);
  
  useEffect(() => {
    if (status === 'idle') {
        dispatch(fetchUser());
      }
  }, [dispatch, status])

  useEffect(() => {
    const getRatings = async () => {
      const {ratings} = await api.getRatingsForUser(userId);
      setRatings(ratings);
    }
    getRatings();
  }, []);

  useEffect(() => {
    const getReceivingUser = async () => {
      const { user } = await api.getUser(userId);
      setReceivingUser(user);
    };
    getReceivingUser();
  }, [userId]);

  return (
    <div>
      <h1 className={'cursor-pointer'} onClick={() => navigate(`/users/${userId}`)}>Ratings for {receivingUser.username}</h1>
      {ratings.map(rating => (
        <div key={rating.id}>
          <Rating rating={rating} />
        </div>
      ))}
    </div>
  )
}

export default RatingList;