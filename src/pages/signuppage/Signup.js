import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { axiosClient } from '../utils/axiosCilent';
import { useDispatch } from 'react-redux';
import { showToast } from '../../Redux/slices/appConfigure';
import { TOAST_FAILURE, TOAST_SUCCESS } from '../../App';
import { Toaster } from 'react-hot-toast';
function Signup() {
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function handelsubmit(event) {
    event.preventDefault();
    try {
      const result = await axiosClient.post('/auth/signup', {
        name, email, password
      });
      dispatch(showToast({
        type: TOAST_SUCCESS,
        message: result.result
      }))

    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="border-green-500 border-2 rounded-lg  flex flex-col justify-center
    mt-32 w-4/5 lg:w-1/3 mx-auto h-fit py-6" >

      <h2 className='text-3xl font-sans mb-6 font-bold mx-auto'>Signup Page</h2>
      <form onSubmit={handelsubmit} className="flex flex-col justify-center 
        items-center gap-6">
        <div className="w-3/4 h-12 border-4 rounded-lg text-lg ">
          <input type="text" id="name"
            onChange={(event) => setname(event.target.value)}
            className='w-full h-full'
            placeholder='name'
          />
        </div>
        <div className="w-3/4 h-12 border-4 rounded-lg text-lg ">
          <input type="email" id="email"
            onChange={(event) => setemail(event.target.value)}
            className='w-full h-full'
            placeholder='email' />
        </div>
        <div className="w-3/4 h-12 border-4 rounded-lg text-lg ">

          <input type="text" id="password"
            onChange={(event) => setpassword(event.target.value)}
            className='w-full h-full'
            placeholder='password' />
        </div>
        <button type="submit" className="text-white bg-gradient-to-r from-green-500 to-cyan-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-2/5">Sigin</button>
        <p className="text-base">Alreday have an accout ? <Link to="/login" className='text-xl text-green-600'>Login</Link></p>

      </form>

      <Toaster />
    </div>

  )

}
export default Signup;
