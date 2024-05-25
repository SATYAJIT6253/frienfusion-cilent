import React from 'react'
import { KEY_ACESS_TOKEN, getItem } from '../pages/utils/localStoragemanager'
import { Navigate, Outlet } from 'react-router-dom';

function RequireLogin() {
    const user = getItem(KEY_ACESS_TOKEN);
  return (
    user ? <Navigate to = "/login"/> : <Outlet/>
  )
}

export default RequireLogin