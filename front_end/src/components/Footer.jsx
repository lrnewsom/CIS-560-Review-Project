import React,{useState} from 'react'
import axios from 'axios'
import LINK from './Links'
import image from '../Assets/Images/spiderman.jpg'

function Footer() {
    // data to add new user to the database;
    const [NewUserName, SetNewUserName] = useState('')
    const [NewUserEmail, SetNewUserEmail] = useState('')
    const [NewUserPassword, SetNewUserPassword] = useState('')


    // to add new user to database
    function HandelAddNewUser(){
        const parameter = {
            userName: NewUserName,
            userEmail: NewUserEmail,
            userPassword: NewUserPassword,
            userStatus: 0
        };

        axios.post(LINK+'addnewuser', {parameter})
        .then(response=>{
            console.log(response.data);
        })
        .catch(err=>{
            console.log(err);
        })
    }


  return (
    <div className='w-100 bg-dark text-white border' style={{height:'200px'}}>
        <h5 className='mb-2 text-center pt-5'>WELCOME</h5>
        <div className='my-5 container  p-2 d-flex gap-3 .flex-column justify-content-center'>
            {/* <div className='my-4' style={{maxWidth:'400px'}}>
                <label htmlFor="new user name" className='form-label'>USER NAME</label>
                <input type="text" onChange={(e)=>{SetNewUserName(e.target.value)}} class="form-control mb-3"  placeholder="Jhon Cx" />

                <label htmlFor="new user name" className='form-label'>USER EMAIL</label>
                <input type="email" onChange={(e)=>{SetNewUserEmail(e.target.value)}} class="form-control mb-3"  placeholder="name@example.com" />

                <label htmlFor="new user name" className='form-label'>USER PASSWORD</label>
                <input type="text" onChange={(e)=>{SetNewUserPassword(e.target.value)}} class="form-control mb-3"  placeholder="password" />

                <label htmlFor="new user name" className='form-label'>CONFIRM PASSWORD</label>
                <input type="text" class="form-control mb-3" placeholder="password" />

                <button className='btn btn-success my-3' onClick={HandelAddNewUser}>SIGNUP+</button>
                <button className='btn btn-warning my-3 mx-2'>CLEAR</button>
            </div> */}
        </div>
    </div>
  )
}

export default Footer