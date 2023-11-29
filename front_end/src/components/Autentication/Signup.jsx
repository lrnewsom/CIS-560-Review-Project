import React, { useState } from 'react';
import axios from 'axios';
import LINK from '../Links';
import { Link, resolvePath } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Signup({ IsUserSignedUp }) {

  const navigate = useNavigate();

  // data to add a new user to the database;
  const [NewUserName, SetNewUserName] = useState('');
  const [NewUserEmail, SetNewUserEmail] = useState('');
  const [NewUserPassword, SetNewUserPassword] = useState('');
  const [ConfirmPassword, SetConfirmPassword] = useState('');

  // State for displaying validation errors
  const [validationErrors, setValidationErrors] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // to add a new user to the database
  function HandelAddNewUser() {
    // Reset validation errors
    setValidationErrors({
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
    });

    // Basic validation checks
    let isValid = true;

    if (!NewUserName) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        userName: 'Please enter a user name',
      }));
      isValid = false;
    }

    if (!NewUserEmail) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        email: 'Please enter an email address',
      }));
      isValid = false;
    }

    if (!NewUserPassword) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        password: 'Please enter a password',
      }));
      isValid = false;
    }

    if (NewUserPassword !== ConfirmPassword) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: 'Passwords do not match',
      }));
      isValid = false;
    }

    // If any validation check fails, don't proceed with the request
    if (!isValid) {
      return;
    }

    // Proceed with the request
    const parameter = {
      userName: NewUserName,
      email: NewUserEmail,
      password: NewUserPassword,
      isAdmin: false,
    };

    axios
      .post(LINK + 'adduser', parameter)
      .then((response) => {
        if(response.data === 'failed'){
            Swal.fire({text:'Account already exists!!', icon:'info'});
        }
        if(response.data === 'added'){
            Swal.fire({text:'Your are in ;)', icon:'success'});
            navigate('/autentication');
        }
        // Optionally, you can redirect the user or perform other actions upon successful signup
      })
      .catch((err) => {
        Swal.fire({text:'Error, please try again later!!', icon:"error"});
        console.log(err);
      });
  }

  return (
    <div className="bg-light d-flex p-3 justify-content-center">
      <div className="pt-5 border rounded p-2">
        <h5 className="mb-2">SIGNUP</h5>
        <div className="my-4" style={{ maxWidth: '600px', minWidth: '400px' }}>
          <label htmlFor="new user name" className="form-label">
            USER NAME
          </label>
          <input
            type="text"
            onChange={(e) => {
              SetNewUserName(e.target.value);
            }}
            className="form-control"
            placeholder="Jhon Cx"
          />
          <div className="text-danger">{validationErrors.userName}</div>
          <br />
          <label htmlFor="new user name" className="form-label">
            USER EMAIL
          </label>
          <input
            type="email"
            onChange={(e) => {
              SetNewUserEmail(e.target.value);
            }}
            className="form-control"
            placeholder="name@example.com"
          />
          <div className="text-danger">{validationErrors.email}</div>
          <br />
          <label htmlFor="new user name" className="form-label">
            USER PASSWORD
          </label>
          <input
            type="password"
            onChange={(e) => {
              SetNewUserPassword(e.target.value);
            }}
            className="form-control"
            placeholder="password"
          />
          <div className="text-danger">{validationErrors.password}</div>
          <br />
          <label htmlFor="new user name" className="form-label">
            CONFIRM PASSWORD
          </label>
          <input
            type="password"
            onChange={(e) => {
              SetConfirmPassword(e.target.value);
            }}
            className="form-control"
            placeholder="password"
          />
          <div className="text-danger">{validationErrors.confirmPassword}</div>
          <br />

          <button className="btn btn-success my-3" onClick={HandelAddNewUser}>
            ADD USER+
          </button>
          <Link to={'/autentication'}>
            <button className="btn btn-warning my-3 mx-2">CANCEL</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
