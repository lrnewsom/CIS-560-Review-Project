import React,{useState, useEffect} from 'react'
import axios from 'axios'
import LINK from '../Links'

import './RatingIntro.css'
import DetailedRatingView from '../DetailedRatingView/DetailedRatingView'

import lightRating from "./jhonwick.png"
import Reviwes from './Reviwes'
import { Link } from 'react-router-dom'


import movie1 from './images/guy_movie.jpg';
import movie2 from './images/camera_movie.jpg';
import movie3 from './images/scary_movie.jpg';



const image = [movie1, movie2, movie3];


function Movies({isHighest}) {
    const [Movies, SetMovies] = useState([]);
    const [IsNoData, SetIsNoData] = useState(false);
    
    useEffect(()=>{
        axios.get(LINK+'getmovies')
        .then(response=>{
            if(response.data === 'failed'){
                SetMovies([]);
                SetIsNoData(true);
            }else{
                SetMovies(response.data);
                console.log('books returned');
            }
        })
        .catch(err=>{
            console.log('no books faileed');
            SetMovies([]);
            SetIsNoData(true);
        })
    }, [])

  return (
    <div className='p-1 container bg-dark  mt-3' style={{maxWidth:'90%'}}>
        <div className='mb-5 d-flex flex-column'>
            <h1 className='my-5 px-2 text-white text-center'> {"MOVIES"}</h1>
            <div className='d-flex flex-wrap container gap-3 justify-content-center'>
                {Movies.map((movie, data)=>(
                    data < 3 ? (<div key={data}>
                        <DetailedRatingView 
                            image={image[data]}
                            name={movie.ProductName}
                            rank={'1'}
                            rating={movie.Rating}
                            gener={movie.Genre}
                            userRating={`${Math.floor(Math.random() * 11)}/10`}
                            productID={movie.ProductID}
                        />  
                    </div> ) : null
                ))}
            </div>

            {isHighest ?( 
                <div className='d-flex justify-content-center'>
                    <Link to={'/movie'}><button className='btn btn-primary my-5' >SEE MORE</button> </Link>
                </div> ) : null}
        </div>
    </div>
  )
}

export default Movies