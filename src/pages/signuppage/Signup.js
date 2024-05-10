import React, { useState } from 'react'
import './Signup.scss';
import { Link } from 'react-router-dom';
import { axiosClient } from '../utils/axiosCilent';
function Signup() 
{
  const[name,setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  async function handelsubmit(event) {
    event.preventDefault();
    try {
      const result = await axiosClient.post('/auth/signup', {
        email, password
      });
      console.log(result);
    } catch (error) {
      console.log(error);
      console.log(error.message);
    }
  }
    return (
      <div className="signup" >
        <div className="signup-box">
          <h2 className='heading'>Signup Page</h2>
          <form  onSubmit={handelsubmit}>
            <label htmlFor="name">Name : </label>
            <input type="text" className="name" id="name" 
            onChange={(event) =>setname(event.target.value)}
            />

            <label htmlFor="email">Email : </label>
            <input type="email" className="email" id="email" 
            onChange={(event) =>setemail(event.target.value)}/>

            <label htmlFor="password">Password : </label>
            <input type="text" className="password" id="password" 
            onChange={(event) => setpassword(event.target.value) }/>

            <input type="submit" className="submit" />
            <p className="subheading">Already have an account <Link to="/login">Login</Link></p>
          </form>
        </div>
      </div>
    )
    
}
  export default Signup;