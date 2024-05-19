import React, { useEffect, useState } from 'react'
import { KEY_ACESS_TOKEN, getItem} from '../pages/utils/localStoragemanager';
import { Outlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
function RequireUser() {
    const user = getItem(KEY_ACESS_TOKEN);
    
  return (
    (user) ? <Outlet/> : <Navigate to="/login"/>
  )
}

export default RequireUser;