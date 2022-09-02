import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function Protected({Component}) {
  if(Cookies.get('netflix_id')){
    return <Component />
  }else{
      return <Navigate to={'/'} />
  }
}

export default Protected