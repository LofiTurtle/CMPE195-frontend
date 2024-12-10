import {useNavigate, useParams} from "react-router-dom";
import api from "../../Services/api.js";
import {useEffect, useState} from "react";
import RatingRow from "./RatingRow.jsx";

const Rating = () => {
  const navigate = useNavigate();
  const { userId } = useParams();

  const [summary, setSummary] = useState();
  const [showNoSummary, setShowNoSummary] = useState(false);

  useEffect(() => {
    const getRatingSummary = async () => {
      const { summary: ratingSummary } = await api.getRatingSummary(userId);
      if (ratingSummary !== null) {
        setSummary(ratingSummary);
      } else {
        setShowNoSummary(true);
      }
    }
    getRatingSummary();
  }, [userId]);

  if (showNoSummary) {
    return <div>No ratings yet</div>
  }

  if (!summary) {
    return <div>Loading ratings...</div>;
  }

  return (
    <div className={'border m-2 p-4 rounded-lg cursor-pointer w-fit'} onClick={() => navigate(`/users/${userId}/ratings`)}>
      {summary.fields.map(field => (
        <div key={field.name}>
          <RatingRow label={field.name} value={field.value} />
        </div>
      ))}
      <p className={'pt-2'}>{summary.count} rating{summary.count === 1 ? '' : 's'}</p>
    </div>
  )
}

export default Rating