import React from 'react';
import {Navigate } from 'react-router-dom';
function PrivateRoute({ children }) {
    const auth = localStorage.getItem('jwt-token') !== 'undefined' && localStorage.getItem('jwt-token') !== null;
    console.log(auth)
    console.log(localStorage.getItem('jwt-token'))
    return auth ? <>{children}</> : <Navigate to="/login" />;
  }
export default PrivateRoute;