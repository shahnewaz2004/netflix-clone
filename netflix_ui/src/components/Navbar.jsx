import React from "react";
import {useNavigate} from 'react-router-dom';
import Logo from "../assets/logo.png";

function Navbar({page}) {
  const navigate = useNavigate();
  return (
    <div className="absolute top-0 z-10">
      <div className="flex items-center justify-between px-8 md:px-12 py-4 w-screen">
        <img src={Logo} alt="Logo" className="w-[120px] md:w-[180px]" />
        <button onClick={() => {page === 'login' ? navigate('/') : navigate('/login')}} className="bg-red-600 rounded px-5 py-1.5 text-white font-semibold font-montserrat cursor-pointer">
          {
            page === 'login' ? 'Sign Up' : 'Login'
          }
        </button>
      </div>
    </div>
  );
}

export default Navbar;
