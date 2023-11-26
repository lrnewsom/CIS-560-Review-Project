import React,{useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom';



export default function Reviwes({productType, genre, name, rating}){
    // the product ID will be used to get all the movies
    const location = useLocation();
    const productID = new URLSearchParams(location.search).get('ProductID')
    const [ProductID, SetProductId] = useState(productID);

    // is user logedIN?
    // if user is logged in, it will allow the user to 
    // make reviwes
    const [IsUserLogedIN, SetIsUserLogedIn] = useState(false);
    const [UserID, SetUserID] = useState(123);
    const [RatingRange, SetRatingRange] = useState(0);


    
    return(
        <div className='bg-light p-4'>
            <div className='container mt-5'>
                <div>
                    <h1 className='.text-center text-uppercase mb-3'>{productType} REVIWES</h1>    
                </div>
                
                <h6 className='.text-center text-uppercase mb-3'>{name}</h6>
                <h6 className='.text-center text-uppercase mb-3'>GEnre: {genre}</h6>
                <h6 className='.text-center text-uppercase mb-3'>Current Rateing: {rating}</h6>
                <div className='mb-5'>
                    <div style={{maxWidth:'600px'}}>
                        <label className='form-label fs-4 text-uppercase'> your rating: {RatingRange}</label>
                        <input type="range" class="form-range" min="0" max="10" step={0.5} onChange={(e)=>SetRatingRange(e.target.value)} id="customRange2"></input>
                    </div>

                    <div className='my-3' style={{maxWidth:'600px'}}>
                        <label className='form-label fs-4 text-uppercase'> Enter review</label>
                        <textarea className='form-control' name="review" id="" cols="" rows="3"></textarea>
                    </div>
                    <div className='d-flex gap-2 flex-wrap'>
                        <button className='btn btn-success text-uppercase'>Submit review</button>
                        <button className='btn btn-danger  text-uppercase'>Cancel</button>
                    </div>
                </div>                
            </div>

        </div>
    )
}