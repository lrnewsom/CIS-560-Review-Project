import React, {useState, useEffect} from 'react'
import axios from 'axios'
import LINK from '../Links';

export default function () {

    const [disUser, setDisUser] = useState('current');
    const [FilterBY, SetFilterBy] = useState('all');
    const [SearchUser, SetSearchUser] = useState('');
    const [Users, SetUsers] = useState([]);


    // data to add new user to the database;
    const [NewUserName, SetNewUserName] = useState('')
    const [NewUserEmail, SetNewUserEmail] = useState('')
    const [NewUserPassword, SetNewUserPassword] = useState('')
    const [NewUserStatus, SetNewUserStatus] = useState('')



    // get users from the backend
    // if the filtration is applied use that to find the users
    useEffect(()=>{
        if(true){
            axios.get(LINK+"getallusers")
            .then(response=>{
                if(response.data === 'failed'){
                    SetUsers([]);
                }
                else{
                  SetUsers(response.data);  
                }
                
            })
            .catch(err=>{
                console.log(err);
                SetUsers([]);
            })   
        }  
    }, []);


    //console.log(Users)

    //given user ID delete the user from the database
    function HandelDeleteUserFromDataBase(userID){
        axios.delete(LINK+`deleteuser/${userID}`)
        .then(response=>{
            console.log(response.data);
        })
        .catch(err=>{
            console.log(err);
        })
    }



    // update user status based on the given user ID
    // which means update if user can be an admin or lose admin power
    function HandelSetUserAsAdmin(userID){
        axios.get(LINK+'changeuserstatus', {params:{userID:userID}})
        .then(response=>{
            console.log(response.data);
        })
        .catch(err=>{
            console.log(console.error(err));
        })
    }



    // to add new user to database
    function HandelAddNewUser(){
        const parameter = {
            userName: NewUserName,
            email: NewUserEmail,
            password: NewUserPassword,
            isAdmin: NewUserStatus == '0' ? false : true
        };

        axios.post(LINK+'adduser', parameter)
        .then(response=>{
            console.log(response.data);
        })
        .catch(err=>{
            console.log(err);
        })
    }





  return (
    <div>
        {/* To manage user profile add, edit etc */}
        <div className='my-5'>
            <h5 className='my-2'>MANAGE USERS</h5>
            <div className='d-flex gap-2'>
                <button className={`btn ${disUser == 'add' ? 'btn-dark' : 'btn-primary'}`} onClick={()=>{setDisUser('add')}}>ADD NEW USER</button>
                <button className={`btn ${disUser == 'current' ? 'btn-dark' : 'btn-primary'}`} onClick={()=>{setDisUser('current')}}>SHOW CURRENT USERS</button>    
            </div>
            

            {/* Add new users */}
            {disUser === "add" ? (
            <div className='my-5  border rounded p-2'>
                <h5 className='mb-2'>ADD USERS</h5>
                <div className='my-4' style={{maxWidth:'400px'}}>
                    <label htmlFor="new user name" className='form-label'>USER NAME</label>
                    <input type="text" onChange={(e)=>{SetNewUserName(e.target.value)}} class="form-control"  placeholder="Jhon Cx" />
                    <br />
                    <label htmlFor="new user name" className='form-label'>USER EMAIL</label>
                    <input type="email" onChange={(e)=>{SetNewUserEmail(e.target.value)}} class="form-control"  placeholder="name@example.com" />
                    <br />
                    <label htmlFor="new user name" className='form-label'>USER PASSWORD</label>
                    <input type="text" onChange={(e)=>{SetNewUserPassword(e.target.value)}} class="form-control"  placeholder="password" />
                    <br />
                    <label htmlFor="new user name" className='form-label'>CONFIRM PASSWORD</label>
                    <input type="text" class="form-control" placeholder="password" />
                    <br />
                    <label htmlFor="new user name" className='form-label text-danger'>IS USER ADMIN?</label>
                    <select className='form-select' onChange={(e)=>{SetNewUserStatus(e.target.value)}}>
                        <option selected value="0">NO</option>
                        <option value="1">YES</option>
                    </select>
                    <button className='btn btn-success my-3' onClick={HandelAddNewUser}>ADD USER+</button>
                    <button className='btn btn-warning my-3 mx-2'>CANCEL</button>
                </div>
            </div>) : null}
            











            {/* See existing users */}
            {disUser === "current" ? (
            <div className='my-5 border p-2 rounded'>
                <h5 className='my-2'>CURRENT USERS</h5>

                <div className='mb-4'>
                    <div class="input-group mb-3" style={{maxWidth:'400px'}}>
                        <input type="text" class="form-control" placeholder="search product"  aria-describedby="button-addon2" required/>
                        <button class="btn btn-secondary" type="button" id="button-addon2">SEARCH</button>
                    </div>
                </div>

                <div className='my-3'>
                    <label htmlFor="filter user" className='form-label'> FILTER BY</label>
                    <select className='form-select' style={{maxWidth:'400px'}}>
                        <option selected value="all">ALL</option>
                        <option value="inactive">INACTIVE</option>
                        <option value="mostactive">MOST ACTIVE</option>
                        <option value="mostactive">ADMIN</option>
                    </select>
                </div>
                {/* to see current users and their reviews */}
                <div className='d-flex gap-2 flex-wrap my-5'>

                    {/* user info starts */}
                    {Users.map((user, key)=>(
                        <div class="card text-bg-dark mb-3" style={{Width: '20rem'}}>
                            <div class="card-header">{user.UserName}</div>
                            <div class="card-body">
                                <p class="card-title" style={{fontSize:'.8rem'}}>Email: {user.Email}</p>
                                <p class="card-title" style={{fontSize:'.8rem'}}>Book reviewed : 123</p>
                                <p class="card-title" style={{fontSize:'.8rem'}}>Movie reviewed: 123</p>
                                <p class="card-title" style={{fontSize:'.8rem'}}>Video game reviewed: 1233</p>
                                <div className='py-2 d-flex gap-2 justify-content-between'>
                                    <button className='btn btn-sm bg-danger' onClick={()=>{HandelDeleteUserFromDataBase(user.UserID)}}>DELETE</button>
                                    <button className='btn btn-sm bg-success text-white'>SEE REVIEWS</button>
                                </div>
                            </div>
                        </div>    
                    ))}
                    {/* user info ends */}
                </div>
            </div> ) : null}
        </div>
    </div>
  )
}
