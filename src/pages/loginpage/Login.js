import React, { useState } from 'react'
import './Login.scss';
import { Link, useNavigate } from 'react-router-dom';
import { axiosClient } from '../utils/axiosCilent';
import { KEY_ACESS_TOKEN, setItem } from '../utils/localStoragemanager';

function Login() {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const navigate = useNavigate();
  async function handelsubmit(event) {
    event.preventDefault();
   
    try {
      const result = await axiosClient.post('/auth/login', {
        email, password
      });
      setItem(KEY_ACESS_TOKEN, result.result.acesstoken);
      navigate('/');
      // console.log("result is ",result.result.acesstoken);
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <div className="login">
      <div className="login-box">
        <h2 className='heading'>Login Page</h2>

        <form onSubmit={handelsubmit}>
          <label htmlFor="email">Email : </label>
          <input type="email" className="email" id="email"
            onChange={(event) => setemail(event.target.value)} />

          <label htmlFor="password">Password : </label>
          <input type="password" className="password" id="password"
            onChange={(event) => setpassword(event.target.value)} />

          <input type="submit" className="submit" />
          <p className="subheading">Do not have accout ? <Link to="/signup">Signup</Link></p>
        </form>
      </div>
    </div>
  )
}

export default Login;