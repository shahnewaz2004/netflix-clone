import React from "react";
import {useNavigate} from 'react-router-dom';
import {FaSearch} from 'react-icons/fa';
import {ImSwitch} from 'react-icons/im';
import Logo from "../assets/logo.png";
import Cookies from "js-cookie";
import {Link} from 'react-scroll'

function DashNavbar({token}) {
  const navigate = useNavigate();
  const links = [
    {name: 'Home', link: '/dashboard'},
    {name: 'TV Shows', link: 'tv'},
    {name: 'Movies', link: 'movies'},
    {name: 'My List', link: `/list/${token}`}
  ]

  const logout = function(){
    Cookies.remove('netflix_id');
    navigate('/');
  }

  return (
    <div className="absolute top-0 z-10">
      <div className="flex items-center justify-between px-12 py-4 w-screen">
        <div className="flex items-center">
          <img src={Logo} alt="Logo" className="w-[120px] md:w-[180px]" />
          <ul className="flex text-white font-poppins space-x-3 md:space-x-8 text-base md:ml-10">
            {
                links.map((value, index) => {
                   return (
                     value.name !== 'My List' ?
                    <li key={index} className='cursor-pointer' ><Link to={value.link} smooth={true} spy={true} > {value.name} </Link></li>
                    :
                    <li key={index} className='cursor-pointer' onClick={() => navigate(`${value.link}`)} > {value.name} </li>
                   )

                })
            }
          </ul>
        </div>

        <div className="flex items-center text-white">
            <div className=" hidden lg:flex items-center rounded bg-black/50 border border-gray-400 pr-3 mr-10">
                <input className="p-2 font-inter bg-transparent outline-none " type="text" placeholder="Search"/>    
                <FaSearch className="text-base cursor-pointer text-gray-300"/>
            </div>
            <div>
                <ImSwitch onClick={logout} className="text-xl text-red-600 cursor-pointer" />
            </div>
        </div>
        
      </div>
    </div>
  );
}

export default DashNavbar;