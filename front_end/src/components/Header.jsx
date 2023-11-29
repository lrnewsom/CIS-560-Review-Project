import React,{useState} from 'react'
import favimg from '../Assets/Images/spiderman.jpg'
import '../CommonStyling.css'
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';


export default function Header() {
    const CurrentUser = useSelector((state) => state.session.user);
    const userLoggedIN = useSelector((state) => state.session.userIsLoggedIn);


  return (
    <header className=" bg-black postion-relative">
        <div className="container .d-none"> <br/> <br/> 
            <nav className="navbar rounded py-2 container navbar-expand-lg bg-white nav-bar-container">
                <div className="container">
                    <a className="navbar-brand txt-clr-darkblue" href="../pages/Index.php">
                        <img src="/Asets/Images/logo.jpg" className='logo' alt=""/>
                    </a>
                    <button className="navbar-toggler"
                            data-bs-toggle="collapse"
                            data-bs-target="#nav-items"
                            type="button">
                            <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="nav-items">
                        <ul className="navbar-nav ms-auto ">
                            <li className="navbar-item ">
                                <button className="nav-link btn txt-clr-darkblue" style={{width: "fit-content"}} ><Link to={'/'}>HOME</Link>  <i className="bi bi-house m-1"></i></button>
                            </li>

                            <li className="navbar-item dropdown ">
                                <button  className="nav-link btn txt-clr-darkblue" style={{width: "fit-content"}}> <Link to={'/movie'}>MOVIE REVIEW <i className="bi bi-newspaper m-1"></i></Link>  </button>
                            </li>

                            <li className="navbar-item">
                                <button className="nav-link btn txt-clr-darkblue" style={{width: "fit-content"}}> <Link to={'/game'}>VIDEO GAME REVIEW <i className="bi bi-newspaper m-1"></i></Link> </button>
                            </li>
                            <li className="navbar-item">
                                <button className="nav-link btn txt-clr-darkblue" style={{width: "fit-content"}}> <Link to={'/book'} >BOOK REVIEW <i className="bi bi-newspaper m-1"></i></Link> </button>
                            </li>

                            {!userLoggedIN ? (
                            <li className="navbar-item">
                                <button className="nav-link btn txt-clr-darkblue" style={{width: "fit-content"}}> <Link to={'/autentication'}>LOG IN</Link> </button>
                            </li> ) : null}
                            

                            {/* If the user is signedup then do the following */}
                            {userLoggedIN  ? (
                                <li className="navbar-item ">
                                    <button className="nav-link btn txt-clr-white card-shadow-darkblue p-2 rounded-0 bg-clr-gold" style={{width: "fit-content"}}> <Link  to={'/admin'}> MNG ACCOUNT </Link>  </button>
                                </li> ) : null}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>



        <div>
            <div className="container  org-name p-3">
            </div>
            <img src={favimg} className="bg-img" alt="lalibela ethiopia" />
        </div>
    </header>
  )
}
