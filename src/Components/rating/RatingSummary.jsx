import {useNavigate, useParams} from "react-router-dom";
import api from "../../Services/api.js";
import {useEffect, useState} from "react";

const Rating = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  
  const [summary, setSummary] = useState();

  useEffect(() => {
    const getRatingSummary = async () => {
      const { summary: ratingSummary } = await api.getRatingSummary(userId);
      setSummary(ratingSummary);
    }
    getRatingSummary();
  }, [userId]);

  const caps = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  if (!summary) {
    return <div>Loading ratings...</div>;
  }

  return (
    <div className={'border m-2 p-4 rounded-lg cursor-pointer'} onClick={() => navigate(`/users/${userId}/ratings`)}>
      {summary.fields.map(field => (
        <div key={field.name}>
          <span className={'inline-block min-w-40'}>{caps(field.name)}</span>
          <span>{field.value}</span>
        </div>
      ))}
      <p>{summary.count} ratings</p>
    </div>
  )
}

export default Rating