import React from 'react'
import favimg from '../Assets/Images/spiderman.jpg'
import '../CommonStyling.css'
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header class=" bg-black postion-relative">
        <div class="container .d-none"> <br/> <br/> 
            <nav class="navbar rounded py-2 container navbar-expand-lg bg-white nav-bar-container">
                <div class="container">
                    <a class="navbar-brand txt-clr-darkblue" href="../pages/Index.php">
                        <img src="/Asets/Images/logo.jpg" class='logo' alt="Logo"/>
                    </a>
                    <button class="navbar-toggler"
                            data-bs-toggle="collapse"
                            data-bs-target="#nav-items"
                            type="button">
                            <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="nav-items">
                        <ul class="navbar-nav ms-auto ">
                            <li class="navbar-item ">
                                <button class="nav-link btn txt-clr-darkblue" style={{width: "fit-content"}} ><Link to={'/'}>HOME</Link>  <i class="bi bi-house m-1"></i></button>
                            </li>

                            <li class="navbar-item dropdown ">
                                <button  class="nav-link btn txt-clr-darkblue" style={{width: "fit-content"}}> <Link to={'/movie'}>MOVIE REVIEW <i class="bi bi-newspaper m-1"></i></Link>  </button>
                            </li>

                            <li class="navbar-item">
                                <button class="nav-link btn txt-clr-darkblue" style={{width: "fit-content"}}> <Link to={'/game'}>VIDEO GAME REVIEW <i class="bi bi-newspaper m-1"></i></Link> </button>
                            </li>
                            <li class="navbar-item">
                                <button class="nav-link btn txt-clr-darkblue" style={{width: "fit-content"}}> <Link to={'/book'} >BOOK REVIEW <i class="bi bi-newspaper m-1"></i></Link> </button>
                            </li>
                            <li class="navbar-item">
                                <button class="nav-link btn txt-clr-darkblue" style={{width: "fit-content"}}> <Link to={'/autentication'}>LOG IN</Link> </button>
                            </li>
                            <li class="navbar-item ">
                                <button class="nav-link btn txt-clr-white card-shadow-darkblue p-2 rounded-0 bg-clr-gold" style={{width: "fit-content"}}> <Link  to={'/admin'}> MNG ACCOUNT </Link>  </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>



        <div>
            <div class="container  org-name p-3">
            <h1 class='txt-clr-white mb-1 text-center text text-uppercase'>GREAT REVIEWS, <br/> WHERE HUMANS MEET ZOOMBIES TO REVIEW MOVIE</h1><br/>
                <a class="btn bg-clr-gold txt-clr-darkblue rounded-0 card-shadow-darkblue" href="../pages/EmailCard.php#email-card"> Contact us</a>
                <a class="btn bg-clr-gold txt-clr-white rounded-0 card-shadow-darkblue position-relative" href="./Index.php#news-card"> News
                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        Show
                        <span class="visually-hidden">Articles</span>
                    </span>
                </a>
            </div>
            <img src={favimg} class="bg-img" alt="lalibela ethiopia" />
        </div>
    </header>
  )
}
