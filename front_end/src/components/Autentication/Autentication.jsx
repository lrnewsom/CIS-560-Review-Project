import React, { useState } from 'react';
import axios from 'axios';
import LINK from '../Links';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { setUserReducer, resetUserReducer } from '../../reducer/SessionSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import HandelLogInLogOut from './HandelLogInLogOut';


export default function Autentication() {

  const dispatch = useDispatch();
  const CurrentUser = useSelector((state) => state.session.user);
  const userLoggedIN = useSelector((state) => state.session.userIsLoggedIn);
  // the currently logedin user data
  const userData = JSON.parse(Cookies.get(['User']))
  console.log(userData)

  const navigate = useNavigate();

  const [UserEmail, SetUserEmail] = useState('');
  const [UserPassword, SetUserPassword] = useState('');
  const [User, SetUser] = useState([]);
  const [validationErrors, setValidationErrors] = useState({
    email: '',
    password: '',
  });

  function HandelLogIn() {
    // Reset validation errors
    setValidationErrors({
      email: '',
      password: '',
    });

    // Basic validation checks
    let isValid = true;

    if (!UserEmail) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        email: 'Please enter an email address',
      }));
      isValid = false;
    }

    if (!UserPassword) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        password: 'Please enter a password',
      }));
      isValid = false;
    }

    // If any validation check fails, don't proceed with the request
    if (!isValid) {
      return;
    }

    // Proceed with the request
    const data = { email: UserEmail, password: UserPassword };

    axios
      .post(LINK + 'login', data)
      .then((response) => {
        if (response.data === 'failed') {
          Swal.fire({text:'Wrong password or email', icon:'error'});
          SetUser([]);
        } else {
          Cookies.set('User', JSON.stringify(response.data), {expires: 1, sameSite:'None', secure:true});
          navigate('/admin')
          SetUser(response.data);
          dispatch(setUserReducer(userData));
        }
      })
      .catch((err) => {
        SetUser([]);
        console.log(err['message']);
        console.log(data);
      });
  }

  console.log(CurrentUser);
  console.log(userLoggedIN);


  return (
    <div class=" bg-clr-secondary p-3 txt-clr-darkblue" id="loginform">
      <div className="p-2 my-5" style={{ maxWidth: '500px', margin: 'auto' }}>
        <h2 className="txt-clr-darkblue text-center"> LOG IN</h2>
        <label> Email address</label>
        <br />
        <input
          className="form-control rounded-0 border border-1 border-dark"
          name="emailAddress"
          type="text"
          onChange={(e) => {
            SetUserEmail(e.target.value);
          }}
        />
        <div className="text-danger">{validationErrors.email}</div>
        <br />

        <label> Password</label>
        <br />
        <input
          className="form-control rounded-0 border border-1 border-dark"
          name="passWord"
          type="password"
          onChange={(e) => {
            SetUserPassword(e.target.value);
          }}
        />
        <div className="text-danger">{validationErrors.password}</div>
        <br />
        <button className="btn bg-clr-gold rounded-0 card-shadow-darkblue" onClick={HandelLogIn}>
          LOG IN
        </button>
        <Link to={'/signup'}>
          {' '}
          <button className="btn bg-clr-gold rounded-0 card-shadow-darkblue mx-4">SIGNUP</button>
        </Link>
      </div>

      <div>
        <h1 className="text-uppercase text-center">
          NO account? <i> signup!!</i>{' '}
        </h1>
      </div>
    </div>
  );
}
