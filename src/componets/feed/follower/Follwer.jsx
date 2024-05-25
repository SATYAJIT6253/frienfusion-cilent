import React, { useEffect, useState } from 'react'
import Avtar from '../../avtar/Avtar';
import './follower.scss';
import { useDispatch,useSelector } from 'react-redux';
import { followunfollow } from '../../../Redux/slices/feedConfigure';
function Follwer({user}) {
  const dispatch = useDispatch();
  const feedData = useSelector((state)=> state.feedConfigreducer.feedProfile);
  const [isFollwing,setisFollowing] = useState();
  async function foloowonfollowhandlere() {
      dispatch(followunfollow({
        useridtofollow : user._id
      }))
  }
  useEffect(()=>{
    if(feedData.followings.find(item=>item._id === user._id))
      {
        setisFollowing(true);
      }else{
        setisFollowing(false);
      }
  },[feedData])
  return (
    <div className='follower'>
        <Avtar  src={user?.avatar?.url}/>
        <h4 className='name'>{user?.name}</h4>
        <button className='follow-btn'
        onClick={foloowonfollowhandlere}>{isFollwing ? "unfollow": "follow"}</button>
    </div>
  )
}

export default Follwer;