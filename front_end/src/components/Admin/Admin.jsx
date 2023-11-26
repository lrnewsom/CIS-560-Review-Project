import React, {useState} from 'react'
import MngUsers from './MngUsers';
import AddProduct from './AddProduct';




function Admin() {

    const [ItemToManage, SetItemToManage] = useState("users")
    const [UserStatus, SetUserStatus] = useState(true); 


  return (
    <div className='container bg-light py-2 my-3 rounded'>
        <div className='bg-success p-3 my-2 rounded text-white'>
            <h1>YOU ARE ADMIN</h1>
            <h5 className='my-3'>WELCOME {'Biruk'}</h5>    
        </div>
        
        <div className='d-flex gap-3'>
            <button onClick={()=>SetItemToManage('users')}  className={`btn px-4 py-3 ${ItemToManage === 'users' ? 'btn-info' : 'btn-primary'}`} >MNG USERS</button>
            <button onClick={()=>SetItemToManage('movie')} className={`btn px-4 py-3 ${ItemToManage === 'movie' ? 'btn-info' :'btn-primary'}`} >MNG MOVIES</button>
            <button onClick={()=>SetItemToManage('book')}  className={`btn px-4 py-3 ${ItemToManage === 'book' ? 'btn-info' : 'btn-primary'}`} >MNG BOOKS</button>
            <button onClick={()=>SetItemToManage('game')}  className={`btn px-4 py-3 ${ItemToManage === 'game' ? 'btn-info' : 'btn-primary'}`} >MNG VIDEO GAMES</button>
        </div>

        {ItemToManage === 'users' ?  <MngUsers /> : null}
        {ItemToManage === 'movie' ? <AddProduct ProductType={'movie'} /> : null}
        {ItemToManage === 'book' ?  <AddProduct ProductType={'book'} /> : null}
        {ItemToManage === 'game' ?  <AddProduct ProductType={'video game'} /> : null}


        <br /><br /><br />
    </div>
  )
}

export default Admin