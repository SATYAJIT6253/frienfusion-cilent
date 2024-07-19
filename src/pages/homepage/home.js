import Navbar from '../../componets/navbar/Navbar';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getmyinformation } from '../../Redux/slices/appConfigure';

function Home() {
  const dispatch = useDispatch();
  useEffect(()=>{
      dispatch(getmyinformation());
  },[])
 return (

    <div className='w-full'>
      <Navbar />
      <div className="outlet" style={{ marginTop: '50px' }}  >
        <Outlet />
      </div>

    </div>
  )
}

export default Home;