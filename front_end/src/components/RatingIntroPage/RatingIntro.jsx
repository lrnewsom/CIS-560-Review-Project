import React,{useState} from 'react'
import './RatingIntro.css'
import DetailedRatingView from '../DetailedRatingView/DetailedRatingView'

import lightRating from "./jhonwick.png"
import Reviwes from './Reviwes'
import Movies from './Movies'
import Books from './Books'
import VideoGame from './VideoGame'

export default function RatingIntro(){
    const [IsRatingSet, SetIsRatingSet] = [true];


  return (
    <div className='p-1 container bg-dark d-flex flex-column justify-content-center' style={{maxWidth:'90%'}} >
       
        {<Movies isHighest={true} />}
        {<Books  isHighest={true}/>}
        {<VideoGame isHighest={true} />}
    </div>
  )
}
