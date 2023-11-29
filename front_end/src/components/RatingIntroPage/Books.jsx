import React,{useState, useEffect} from 'react'
import axios from 'axios'
import LINK from '../Links'
import { Link } from 'react-router-dom'

import book1 from './images/fantasy_book.jpg';
import book2 from './images/girl_book.jpg';
import book3 from './images/dance_book.jpg';


import './RatingIntro.css'
import DetailedRatingView from '../DetailedRatingView/DetailedRatingView'

import lightRating from "./jhonwick.png"
import Reviwes from './Reviwes'

const image = [book1, book2, book3];

function Books({isHighest}) {
    const [Books, SetBooks] = useState([]);
    const [IsNoData, SetIsNoData] = useState(false);
    
    useEffect(()=>{
        axios.get(LINK+'getbooks')
        .then(response=>{
            if(response.data === 'failed'){
                SetBooks([]);
                SetIsNoData(true);
            }else{
                SetBooks(response.data);
                console.log('books returned');
            }
        })
        .catch(err=>{
            console.log('no books faileed');
            SetBooks([]);
            SetIsNoData(true);
        })
    }, [])

//console.log(Books);

  return (
    <div className='p-1 container bg-dark' style={{maxWidth:'90%'}} >
        <div className='mb-5 d-flex flex-column'>
            <h1 className='my-5 px-2 text-white text-center'> {"BOOKS"}</h1>
            <div className='d-flex flex-wrap container gap-3 justify-content-center'>
                {Books.map((data, key)=>(
                    key < 3  ? (
                    <div key={key}>
                        <DetailedRatingView 
                            image={image[key]}
                            name={data.ProductName}
                            rating={`${Math.floor(Math.random() * 11)}/10`}
                            discription={data.Description}
                            gener={key}
                            trailer={'this trailer'}
                            userRating={`${Math.floor(Math.random() * 11)}/10`}
                            productID={data.ProductID}
                        />  
                    </div> ) : null
                ))}
            </div>

            {isHighest ?( 
                <div className='d-flex justify-content-center'>
                    <Link to={'/book'}><button className='btn btn-primary my-5' >SEE MORE</button> </Link>
                </div> ) : null}
        </div>
    </div>
  )
}

export default Books