import React,{useState} from 'react'
import './RatingIntro.css'
import DetailedRatingView from '../DetailedRatingView/DetailedRatingView'

import lightRating from "./jhonwick.png"
import Reviwes from './Reviwes'

function Books({isHighest}) {

  return (
    <div className='p-1 container bg-dark' style={{maxWidth:'90%'}} >
        <div className='mb-5 d-flex flex-column'>
            <h1 className='my-5 px-2 text-white text-center'> {isHighest ? 'HIGHST RATED BOOKS' : "BOOKS"}</h1>
            <div className='d-flex flex-wrap container gap-3 justify-content-center'>
                {Array(6).fill(null).map((_, data)=>(
                    <div key={data}>
                        <DetailedRatingView 
                            image={lightRating}
                            name={'cyberpunk 2077 future edition'}
                            rank={'1'}
                            rating={'8.6/10'}
                            discription={'If you want to capitalize the entire text of an element in Bootstrap, you can use the text-uppercase class. This class sets the text-transform property to uppercase, making all the text in the element appear in uppercase letters.'}
                            gener={'Action game'}
                            trailer={'this trailer'}
                            userRating={'10/10'}
                        />  
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Books