import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import api from "../../Services/api.js";
import RatingRow from "./RatingRow.jsx";

const Rating = ({ rating }) => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const caps = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const handleDelete = async () => {
    await api.deleteRating(rating.rated_user_id);
    await navigate(0);
  }

  return (
    <div className={'border m-2 p-4 rounded-lg bg-white'}>
      <h2 className={'cursor-pointer'} onClick={() => navigate(`/users/${rating.rating_user.id}`)}>By {rating.rating_user.username}</h2>
      <p>{rating.description}</p>
      {rating.fields.map(rating => (
        <div key={rating.name}>
          <RatingRow label={rating.name} value={rating.value} />
        </div>
      ))}
      {rating.rating_user.id === currentUser?.id && (
        <div className={'pt-1'}>
          <button className={'inline mr-4 pr-2 pl-2 border rounded'} onClick={() => navigate(`/users/${rating.rated_user_id}/ratings/submit`)}>Edit</button>
          <button className={'inline mr-4 pr-2 pl-2 border border-black rounded bg-red-500'} onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  )
}

export default Rating