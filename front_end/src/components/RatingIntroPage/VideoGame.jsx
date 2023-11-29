import React,{useState, useEffect} from 'react'
import axios from 'axios'
import LINK from '../Links'
import { Link } from 'react-router-dom'
import game1 from './images/chick_game.jpg';
import game2 from './images/angry_game.jpg';
import game3 from './images/pokman_game.jpg';

import './RatingIntro.css'
import DetailedRatingView from '../DetailedRatingView/DetailedRatingView'

import lightRating from "./jhonwick.png"
import Reviwes from './Reviwes'

const image = [game1, game2, game3];
function VideoGame({isHighest}) {
    const [Games, SetGames] = useState([]);
    const [IsNoData, SetIsNoData] = useState(false);
    
    useEffect(()=>{
        axios.get(LINK+'getbooks')
        .then(response=>{
            if(response.data === 'failed'){
                SetGames([]);
                SetIsNoData(true);
            }else{
                SetGames(response.data);
            }
        })
        .catch(err=>{
            SetGames([]);
            SetIsNoData(true);
        })
    }, [])

//console.log(Games);
  return (
    <div className='p-1 container bg-dark' style={{maxWidth:'90%'}} >
        <div className='mb-5 d-flex flex-column'>
            <h1 className='my-5 px-2 text-white text-center'> {"VIDEO GAMES"}</h1>
            <div className='d-flex flex-wrap container gap-3 justify-content-center'>
                {Games.map((games, index)=>(

                    index < 3 ? (
                    <div key={index}>
                        <DetailedRatingView 
                            image={image[index]}
                            name={games.ProductName}
                            rank={'1'}
                            rating={`${Math.floor(Math.random() * 11)}/10`}
                            discription={'If you want to capitalize the entire text of an element in Bootstrap, you can use the text-uppercase class. This class sets the text-transform property to uppercase, making all the text in the element appear in uppercase letters.'}
                            gener={'Action game'}
                            trailer={'this trailer'}
                            userRating={`${Math.floor(Math.random() * 11)}/10`}
                            productID={games.ProductID}
                        />  
                    </div> ) : null
                ))}
            </div>
            
            {isHighest ?( 
                <div className='d-flex justify-content-center'>
                    <Link to={'/game'}><button className='btn btn-primary my-5' >SEE MORE</button> </Link>
                </div> ) : null}
            
        </div>
    </div>
  )
}

export default VideoGame