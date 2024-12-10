import {useEffect, useState} from "react";
import RatingStar from "./RatingStar.jsx";


const RatingStarList = ({ value, onChange = (index) => {}, count = 5, readOnly = true }) => {
  
  const getFill = (index) => {
    return Math.max(Math.min(value - index, count), 0);
  }

  const handleClick = (index) => {
    console.log('calling onChange with index: ', index);
    onChange(index);
  };

  return (
    <div className={'inline-block'}>
      {Array.from({length: count}).map((_, index) => (
        <RatingStar key={index} fill={getFill(index)} onClick={() => handleClick(index)} readOnly={readOnly} />
      ))}
    </div>
  )
}

export default RatingStarList;