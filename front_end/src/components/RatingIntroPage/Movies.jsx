import React,{useState, useEffect} from 'react'
import axios from 'axios'
import LINK from '../Links'

import './RatingIntro.css'
import DetailedRatingView from '../DetailedRatingView/DetailedRatingView'

import lightRating from "./jhonwick.png"
import Reviwes from './Reviwes'
import { Link } from 'react-router-dom'

function Movies({isHighest}) {
    const [Movies, SetMovies] = useState([]);

    // gets all the movies from the database
    useEffect( ()=>{
        axios.get(LINK+'getmovies')
        .then(response=>{
            SetMovies(response.data);
            console.log(response.data);
        })
        .catch(err=>{
            SetMovies([]);
            console.log(err);
        })
    },[])


  return (
    <div className='p-1 container bg-dark  mt-3' style={{maxWidth:'90%'}}>
        <div className='mb-5 d-flex flex-column'>
            <h1 className='my-5 px-2 text-white text-center'> {isHighest ? 'HIGHST RATED MOVIES' : "MOVIES"}</h1>
            <div className='d-flex flex-wrap container gap-3 justify-content-center'>
                {Movies.map((movie, data)=>(
                    <div key={data}>
                        <DetailedRatingView 
                            image={lightRating}
                            name={movie.Name}
                            rank={'1'}
                            rating={movie.Rating}
                            gener={movie.Genre}
                            userRating={'10/10'}
                            productID={movie.ProductID}
                        />  
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Movies