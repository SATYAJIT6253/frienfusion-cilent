import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { axiosClient } from '../utils/axiosCilent';
import { KEY_ACESS_TOKEN, setItem } from '../utils/localStoragemanager';
import { useDispatch } from 'react-redux';
function Login() {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
      console.log(error);
    }
  }
  return (
    <div className="border-green-500 border-2 rounded-lg  flex flex-col justify-center
    mt-32 h-fit w-4/5 py-6 lg:w-1/3 mx-auto">
      <h2 className='text-3xl font-sans mb-6 font-bold mx-auto'>Login Page</h2>
      <form onSubmit={handelsubmit} className="flex flex-col justify-center 
        items-center gap-6">
        <div className="w-3/4 h-12 border-4 rounded-lg text-lg ">

          <input type="email" id="email"
            onChange={(event) => setemail(event.target.value)} className="w-full h-full" placeholder='email' />
        </div>
        <div className="w-3/4 h-12 border-4 rounded-lg text-lg ">
          <input type="password" id="password"
            onChange={(event) => setpassword(event.target.value)} className="w-full h-full" placeholder='password' />
        </div>
        <button type="submit" className="text-white bg-gradient-to-r from-green-500 to-cyan-500 hover:bg-gradient-to-l 
        focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-2/5">Login</button>
        <p className="text-base">Do not have accout ? <Link to="/signup" className='text-xl text-green-600'>Signup</Link></p>

      </form>
      <Toaster />
    </div>
  )
}

export default Login;
