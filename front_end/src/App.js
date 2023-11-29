import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Cookies from 'js-cookie'

import Header from './components/Header';
import RatingIntro from './components/RatingIntroPage/RatingIntro';
import DetailedRatingView from './components/DetailedRatingView/DetailedRatingView';

import lightRating from './Assets/Images/jhonwick.png'
import Autentication from './components/Autentication/Autentication';
import Admin from './components/Admin/Admin';
import Footer from './components/Footer';
import Reviwes from './components/RatingIntroPage/Reviwes';
import Signup from './components/Autentication/Signup';

import Books from './components/RatingIntroPage/Books';
import Movies from './components/RatingIntroPage/Movies';
import VideoGame from './components/RatingIntroPage/VideoGame';
import { useState } from 'react';



function App() {

  // set cookies when the page starts
  // intially it will be empty
  const data = [];
  Cookies.set('User', JSON.stringify(data), {expires: 1, sameSite:'None', secure:true});


  const userData = JSON.parse(Cookies.get(['User']))
  const [IsUserSet, SetIsUserSet] = useState(userData.length > 0);
  console.log(IsUserSet);

  return (
    <div className=" bg-dark">
      <Router>
      <Header /> 
        <Routes>
          <Route path='/' element={<RatingIntro />} />
          <Route path='autentication' element={<Autentication/>} />
          <Route path='game' element={<VideoGame isHighest={false} />} />
          <Route path='movie' element={<Movies isHighest={false}/>} />
          <Route path='book' element={<Books isHighest={false}/>} />
          <Route path='admin' element={<Admin />} />
          <Route path='reviwes' element={<Reviwes />} />
          <Route path='signup'  element={<Signup />}/>
        </Routes>
      <Footer />  
      </Router>  
      {/* <Admin /> */}
      
    </div>
  );
}

export default App;
