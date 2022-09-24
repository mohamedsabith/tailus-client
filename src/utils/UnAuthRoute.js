import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';


const UnAuthRoute = () => {
    const isAuthenticated = localStorage.getItem('token')
    return isAuthenticated ? <Navigate to="/dashboard"/> : <Outlet/>;
  };

export default UnAuthRoute;