// import { useEffect } from 'react';
// import { axiosClient } from '../utils/axiosCilent';
import './home.scss';
import Navbar from '../../componets/navbar/Navbar';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getmyinformation } from '../../Redux/slices/appConfigure';

function Home() {
  // useEffect(()=>{
  //     fetchData();
  // },[])
  // async function fetchData()
  // {
  //   const response = await axiosClient.get('/posts/all');
  //   console.log("got the response ",response);
  // }
  const dispatch = useDispatch();
  useEffect(()=>{
      console.log("after rendering");
      dispatch(getmyinformation);
      console.log(getmyinformation);
      
      
  },[])
  
  return (

    <>

      <Navbar />


      <div className="outlet" style={{ marginTop: '50px' }}  >
        <Outlet />
      </div>

    </>
  )
}

export default Home;