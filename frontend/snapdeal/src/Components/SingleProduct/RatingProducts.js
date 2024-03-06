import React from 'react'

import {FaStarHalfAlt, FaStar, FaRegStar} from "react-icons/fa";


const RatingProducts = ({stars}) => {
    const ratings = Array.from({length:5}, (a, index)=>{
        let x = index + 0.5;

        return(
            <span key={index}>
            {stars >= index+1 ? <FaStar className='starcolor'/> : stars >= x ? <FaStarHalfAlt className='starcolor'/> : <FaRegStar className='starcolor'/>}
            </span>
        )
    })
  return (
    <div className="ratingss">
      {ratings} <span className='spantag'>(34 reviews)</span>
    </div>
  )
}

export default RatingProducts;
