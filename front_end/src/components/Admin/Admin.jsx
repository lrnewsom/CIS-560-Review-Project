import React, {useState, useEffect} from 'react'
import MngUsers from './MngUsers';
import AddProduct from './AddProduct';
import LINK from '../Links';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { resetUserReducer } from '../../reducer/SessionSlice';
import { useDispatch } from 'react-redux';

// state managment
import { useSelector } from 'react-redux';




function Admin() {
  const CurrentUser = useSelector((state) => state.session.user);
  const userLoggedIN = useSelector((state) => state.session.userIsLoggedIn);

    console.log(CurrentUser);



    const [ItemToManage, SetItemToManage] = useState("users")
    const [UserStatus, SetUserStatus] = useState(true);
    const [Count, AddCount] = useState(0);
    // current user ID
    const [UserID,  SetUserID] = useState(14);

    // current user reviews
    const [Reviwes, SetReviwes] = useState([]);
    const [NoReviews, SetNoReviews] = useState(true);

    const [HideReviewBox, SetHideReviewBox] = useState(true);

    const [RatingRange, SetRatingRange] = useState(0);
    const [Review, SetReview] = useState('');
    const [IsRecommended, SetIsRecommended] = useState(true);
    const [ReviewId, SetReviewID] = useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // when the user logs out
    function HandelLogOut(){
      navigate('/');
      dispatch(resetUserReducer());
    }

    function GetReviews(){
      const data = {UserID: UserID}
      axios.post(LINK+'getuserreviewbyid', data)
      .then(response=>{
        if(response === 'failed'){
          SetReviwes(null);
          Swal.fire({text:'Fatal Erorr!!', icon:'error'});
        }
        else{
          SetReviwes(response.data);
          //navigate('/');
        }
      })
      .catch(err=>{
        Swal.fire({text:`${err['message']}`, icon:'error'});
        SetReviwes([])
      })
    }


    // when the page first loads
    // get all reviews made by this user
    useEffect(()=>{
      GetReviews();
    }, [Count])




  // given the productID and UserID delete the review
  function DeleteReview(ReviewID){
    const data = {ReviewID: ReviewID};
    console.log(ReviewID);
    axios.post(LINK+'deletereview', data)
    .then(response=>{
      if(response.data === 'deleted'){
        Swal.fire({text:'Review Deleted', icon:'success'});
        GetReviews();
      }
    })
    .catch(err=>{
      Swal.fire({text:'Please try again later', icon:"error"});
    })
  }


  // to populate the edit page
  function HandelEdit(ratingRange, reviewID, review, isRecommended){
    SetRatingRange(ratingRange);
    SetReviewID(reviewID);
    SetReview(review);
    SetIsRecommended(isRecommended);
    SetHideReviewBox(false);
  }


  // to update a review
  function HandelUpdateReview() {
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

    // data to be updated
    const data = {
      Rating: RatingRange,
      Review: Review,
      ReviewID: ReviewId,
      IsRecommended: IsRecommended
    }

    axios.post(LINK+"updatereview", data)
    .then(response=>{
      if(response.data === 'failed'){
        console.log(response.data);
        Swal.fire({text:'Failed to update. Please try again later', icon:'error'});
        SetHideReviewBox(true);
      }
      else{
        Swal.fire({text:'Updated!!', icon:'success'});
        SetHideReviewBox(true);
        GetReviews();
      }
    })
    .catch(err=>{
      Swal.fire({text:'Failed to update. Please try again later', icon:'error'});
      SetHideReviewBox(true);
      console.log(err['message'])
    })

  }


console.log(Reviwes.length);
console.log(NoReviews);


  return (
    userLoggedIN ? (
    <div className='container bg-light py-2 my-3 rounded'>
        <div className='bg-success p-3 my-2 rounded text-white'>
            <h1>WELCOME </h1>
            <h5 className='my-3'>{'Biruk Cherie'}</h5>    
        </div>
        
        <div className='m-5'>
          {NoReviews ? (
          <div>
            <h1>Your Reviews</h1>
            <div className='my-5 d-flex flex-column gap-3' style={{ maxWidth: '600px' }}>
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
                      <div className='d-flex gap-2'>
                        <button className='btn btn-danger' onClick={()=>{DeleteReview(review.ReviewID)}}>Delete</button>
                        <button className='btn btn-warning' onClick={()=>{HandelEdit(review.Rating, review.ReviewID, review.Review, review.IsRecommended == 1)}}>Edit</button>
                      </div>
                      
                    </div>
                  </div>
                ))}
            </div>
          </div>):  <h3>No reviews to show. When you make a review it will show up here.</h3>}
          

          <div>
          {HideReviewBox == false ? (
            <div className='mb-5'>
            <div style={{ maxWidth: '600px' }}>
                <label className='form-label fs-4 text-uppercase'> your rating: {RatingRange}</label>
                <input
                type='range'
                className='form-range'
                min='0'
                max='10'
                step={1}
                defaultValue={RatingRange}
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
                defaultValue={Review}
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
                checked={IsRecommended ? true : false}
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
                checked={IsRecommended ? false : true}
                onChange={() => {
                    SetIsRecommended(false);
                }}
                />
                <label className='form-check-label'>No</label>
            </div>

            <div className='d-flex gap-2 flex-wrap'>
                <button className='btn btn-success text-uppercase' onClick={HandelUpdateReview}>
                Submit review
                </button>
                <button className='btn btn-danger text-uppercase' onClick={()=> {SetHideReviewBox(true);}} >Cancel</button>
            </div>
            </div> ): null}
          </div>
          

          {/* Log out as a user */}
           <button className='btn btn-success py-3 px-5' onClick={HandelLogOut}>LOGOUT</button> 
        </div>


        {/* <div className='d-flex gap-3'>
            <button onClick={()=>SetItemToManage('users')}  className={`btn px-4 py-3 ${ItemToManage === 'users' ? 'btn-info' : 'btn-primary'}`} >MNG USERS</button>
            <button onClick={()=>SetItemToManage('movie')} className={`btn px-4 py-3 ${ItemToManage === 'movie' ? 'btn-info' :'btn-primary'}`} >MNG MOVIES</button>
            <button onClick={()=>SetItemToManage('book')}  className={`btn px-4 py-3 ${ItemToManage === 'book' ? 'btn-info' : 'btn-primary'}`} >MNG BOOKS</button>
            <button onClick={()=>SetItemToManage('game')}  className={`btn px-4 py-3 ${ItemToManage === 'game' ? 'btn-info' : 'btn-primary'}`} >MNG VIDEO GAMES</button>
        </div> */}

        {/* {ItemToManage === 'users' ?  <MngUsers /> : null}
        {ItemToManage === 'movie' ? <AddProduct ProductType={'movie'} /> : null}
        {ItemToManage === 'book' ?  <AddProduct ProductType={'book'} /> : null}
        {ItemToManage === 'game' ?  <AddProduct ProductType={'video game'} /> : null} */}


        <br /><br /><br />
    </div> )  : navigate('/')
  )
}

export default Admin