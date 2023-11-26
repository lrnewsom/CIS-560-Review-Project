import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';


import Header from './components/Header';
import RatingIntro from './components/RatingIntroPage/RatingIntro';
import DetailedRatingView from './components/DetailedRatingView/DetailedRatingView';

import lightRating from './Assets/Images/jhonwick.png'
import Autentication from './components/Autentication/Autentication';
import Admin from './components/Admin/Admin';
import Footer from './components/Footer';
import Reviwes from './components/RatingIntroPage/Reviwes';

import Books from './components/RatingIntroPage/Books';
import Movies from './components/RatingIntroPage/Movies';
import VideoGame from './components/RatingIntroPage/VideoGame';

function App() {
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
        </Routes>
      <Footer />  
      </Router>  
      {/* <Admin /> */}
      
    </div>
  );
}

export default App;
