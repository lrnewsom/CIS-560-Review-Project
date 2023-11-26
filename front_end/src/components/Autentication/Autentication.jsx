import React from 'react'

export default function Autentication() {
  return (
    <div class=" bg-clr-secondary p-3 txt-clr-darkblue" id="loginform">
        <form class="p-2" action="" id="logInformInfo" style={{maxWidth: '500px', margin:'auto'}}>
            <h2 class="txt-clr-darkblue text-center"> LOG IN</h2>
            <label for="user name"> Email address</label><br/>
            <input class="form-control rounded-0 border border-1 border-dark" name="emailAddress" type="text" required/><br/>

            <label for="Password"> Password</label><br/>
            <input class="form-control rounded-0 border border-1 border-dark" name="passWord" type="password" required/><br/>
            <button class="btn bg-clr-gold rounded-0 card-shadow-darkblue">LOG IN</button>
        </form>
    </div>
  )
}
