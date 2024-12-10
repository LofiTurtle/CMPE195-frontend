import React from 'react';
import RatingStarList from './RatingStarList';

const RatingRow = ({
  label,
  value,
  onChange,
  readOnly = true,
  labelWidth = 'w-40',
  className = ''
}) => {
  const caps = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <div className={`flex items-center gap-4 border border-t-0 border-l-0 border-r-0 border-b-gray-300 ${className}`}>
      <span className={`${labelWidth} font-medium`}>
        {typeof label === 'string' ? caps(label) : label}
      </span>
      <RatingStarList
        value={value}
        onChange={onChange}
        readOnly={readOnly}
      />
    </div>
  );
};

export default RatingRow;