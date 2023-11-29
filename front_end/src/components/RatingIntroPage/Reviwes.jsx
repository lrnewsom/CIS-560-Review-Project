import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import LINK from '../Links';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
// state managment
import { useSelector } from 'react-redux';


export default function Reviwes({ productType, genre, name, rating }) {

   // global state managment
  const CurrentUser = useSelector((state) => state.session.user);
  const userLoggedIN = useSelector((state) => state.session.userIsLoggedIn);

  //console.log(CurrentUser[0]['UserName']);


  const location = useLocation();
  const productID = new URLSearchParams(location.search).get('ProductID');
  const [ProductID, SetProductId] = useState(productID);
  const [IsUserLogedIN, SetIsUserLogedIn] = useState(false);
  const [UserID, SetUserID] = useState(CurrentUser[0]['UserID']);
  const [RatingRange, SetRatingRange] = useState(0);
  const [Review, SetReview] = useState('');
  const [IsRecommended, SetIsRecommended] = useState(true);
  const [Reviwes, SetReviwes] = useState([]);
  const navigate = useNavigate();
  // hide if the user added a review
  const [HideReviewBox, SetHideReviewBox] = useState(false);

  // gets all the reviews for the product
   function GetReviews(){
    const data = { productID: ProductID };

    axios.post(LINK + 'getreviwes', data)
      .then(response => {
        SetReviwes(response.data);
      })
      .catch(err => {
        SetReviwes([]);
      });
   }


  // when the page loads get all the reviews
  useEffect(() => {
    GetReviews();
  }, []);


  
  function HandelAddReview() {
    // Validate inputs before making the request
    if (RatingRange < 0 || RatingRange > 10) {
        Swal.fire({
            text:'Invalid rating. Please select a rating between 0 and 10.'
        })
      return;
    }

    if (Review.trim() === '') {
        Swal.fire({
            text:'Please enter a review before submitting.'
        })
      return;
    }

    const data = {
      ProductID: ProductID,
      UserName: [CurrentUser[0]['UserName']],
      Rating: RatingRange,
      Review: Review,
      IsRecommended: IsRecommended,
    };

    axios.post(LINK + 'addreview', data)
      .then(response => {
        if(response.data === 'failed'){
            Swal.fire({text:'Failed, please try again later', icon:'error'});
        }
        if(response.data === 'added'){
            Swal.fire({text:'Your Review has been added', icon:'success'});
            GetReviews();
            SetHideReviewBox(true);
        }
      })
      .catch(err => {
        Swal.fire({text:'Failed, please try again later', icon:'error'});
      });
  }



  return (
    <div className='bg-light p-4'>
      <div className='container mt-5'>
        {Reviwes.length > 0 ? (
          <div>
            <h1 className='text-center text-uppercase mb-3'>REVIewS</h1>
          </div>
        ) : (
          <div>
            <h1 className='text-center text-uppercase mb-3'>Be the first person to REVIew</h1>
          </div>
        )}

        <div className='my-5' style={{ maxWidth: '600px' }}>
          {Reviwes.map((review, index) => (
            <div className='card' key={index}>
              <div className='card-header'>{`Date: ${new Date(review.ReviewDate).toLocaleDateString()}`}</div>
              <div className='card-body'>
                <h5 className='card-title'>{review.Reviewer}</h5>
                <h6 className='card-title text-success'>{`Rating: ${review.Rating}/10`}</h6>
                <h6 className={`card-title ${review.IsRecommended === 0 ? 'text-danger' : 'text-success'}`}>
                  {review.IsRecommended === 0 ? 'Not recommended' : 'Recommended'}
                </h6>
                <p className='card-text'>{review.Review}</p>
              </div>
            </div>
          ))}
        </div>

        <h6 className='text-center text-uppercase mb-3'>{name}</h6>
        
        {HideReviewBox == false &&  userLoggedIN ? (
            <div className='mb-5'>
            <div style={{ maxWidth: '600px' }}>
                <label className='form-label fs-4 text-uppercase'> your rating: {RatingRange}</label>
                <input
                type='range'
                className='form-range'
                min='0'
                max='10'
                step={1}
                onChange={(e) => SetRatingRange(e.target.value)}
                id='customRange2'
                ></input>
            </div>

            <div className='my-3' style={{ maxWidth: '600px' }}>
                <label className='form-label fs-4 text-uppercase'> Enter review</label>
                <textarea
                className='form-control'
                name='review'
                id=''
                cols=''
                rows='3'
                onChange={(e) => {
                    SetReview(e.target.value);
                }}
                ></textarea>
            </div>

            <h6 className='form-label mt-3 fs-4 text-uppercase ml-0'> DO YOU RECOMMEND ?</h6>
            <div className='form-check'>
                <input
                className='form-check-input'
                type='radio'
                name='rec'
                value={0}
                onChange={() => {
                    SetIsRecommended(true);
                }}
                />
                <label className='form-check-label'>Yes</label>
            </div>

            <div className='form-check mb-3'>
                <input
                className='form-check-input'
                type='radio'
                name='rec'
                value={0}
                onChange={() => {
                    SetIsRecommended(false);
                }}
                />
                <label className='form-check-label'>No</label>
            </div>

            <div className='d-flex gap-2 flex-wrap'>
                <button className='btn btn-success text-uppercase' onClick={HandelAddReview}>
                Submit review
                </button>
                <button className='btn btn-danger text-uppercase' onClick={()=>navigate('/')} >Cancel</button>
            </div>
            </div> ): !userLoggedIN ? (<button className='btn btn-success' onClick={()=>{navigate('/autentication')}}>LOGIN TO REVIEW</button>) : null}



      </div>
    </div>
  );
}
