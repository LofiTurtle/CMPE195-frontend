import {useEffect, useState} from "react";


const RatingStar = ({ fill = 0, color='#FFD000', onClick = () => {}, readOnly = true }) => {
  const [clampedFill, setClampedFill] = useState(0);
  const gradientId = `RatingStarGradient-${clampedFill}`;
  
  useEffect(() => {
    setClampedFill(Math.max(Math.min(fill, 1), 0))
  }, [fill]);

  return (
    <div className={'relative h-8 w-8 inline-block ' + (readOnly ? '' : 'cursor-pointer')} onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 1024 1024"
           className={'h-8 absolute top-0 left-0 right-0'}>
        <path
          d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5c-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1l-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2c17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9l183.7-179.1c5-4.9 8.3-11.3 9.3-18.3c2.7-17.5-9.5-33.7-27-36.3zM664.8 561.6l36.1 210.3L512 672.7L323.1 772l36.1-210.3l-152.8-149L417.6 382L512 190.7L606.4 382l211.2 30.7l-152.8 148.9z"
          fill={color}></path>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 1024 1024"
           className={'h-8 absolute top-0 left-0 right-0'}>
        <defs>
          <linearGradient id={gradientId}>
            <stop offset={clampedFill} stopColor={color}/>
            <stop offset={clampedFill} stopColor="#FFF0"/>
          </linearGradient>
        </defs>
        <path
          d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5c-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1l-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2c17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9l183.7-179.1c5-4.9 8.3-11.3 9.3-18.3c2.7-17.5-9.5-33.7-27-36.3z"
          fill={`url(#${gradientId})`}></path>
      </svg>
    </div>
  )
}

export default RatingStar