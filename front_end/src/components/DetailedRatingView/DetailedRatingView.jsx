import React from 'react'
import './DetailedRating.css'
import { Link } from 'react-router-dom'



export default function DetailedRatingView({image, name, rating, discription, rank, gener, trailer, userRating, productID}) {
  return (
        <div class="card mb-3 bg-light .text-white rounded border border-white shadow" style={{maxWidth:'18rem'}}>
            <img src={image} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title text-uppercase">{name}</h5>
                {/* <p className="card-text" style={{height:'50px', overflow:"clip"}}><small class="text-body-secondary">{discription}</small></p> */}
                <p className="card-text py-1 my-1"><small class="text-body-secondary">Genre: {gener}</small></p>
                <p className="card-text py-1 my-1"><small class="text-body-secondary">Rating: {rating}</small></p>
                <p className="card-text py-1 my-1"><small class="text-body-secondary">Your rating: {userRating}</small></p>
                <button className='btn btn-primary w-100 rounded-0'> <Link to={`/reviwes?ProductID=${productID}`} >Reviwes</Link>  </button>
            </div>
        </div>
  )
}
