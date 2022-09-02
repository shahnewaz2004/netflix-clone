import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import {IoIosArrowForward} from 'react-icons/io';
import Cookies from "js-cookie";
import '../css/core.css';

function Signup() {

  const navigate = useNavigate();

  useEffect(function(){
    const token = Cookies.get('netflix_id');
    if(token){
      navigate('/dashboard');
    }
  }, [])

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [data, setData] = useState({
    email: '',
    password: ''
  })

  const register = async function(){
    setLoading(true);
    const result = await fetch('https://localhost:9000/user/register', {
      method: 'POST',
      headers: {
        'Content-type' : 'Application/json'
      },
      body: JSON.stringify(data)
    });

    const response = await result.json();
 
    if(!response.success){
      setError(response.message);
    }else{
      navigate('/login');
    }

    setLoading(false);

  }

  return (
    <>
    <div className="w-screen h-screen bg-cover bg-center imagebox"></div>
      <Navbar page={'signup'} />
      <div className="flex items-center justify-center h-full w-full absolute top-0">
        <div className="text-center font-inter text-white w-[90%] sm:w-[80%] lg:w-[60%] xl:w-[40%]">
          <h4 className="text-4xl md:text-6xl font-bold">
            Unlimited movies, TV <br /> shows, and more.
          </h4>
          <h5 className="text-2xl font-semibold mt-5 mb-8">Watch anywhere. Cancel anytime.</h5>
          <p className="text-xl">Ready to watch? Enter your email to create or restart your membership.</p>

          <div className="flex mt-8 justify-center">
            <input onChange={(e) => setData({...data, email: e.target.value})} className="h-[55px] md:h-[65px] flex-1 border-2 outline-none px-1 md:px-5 text-slate-900" type="email" placeholder="Email address"/>
            {
              showPass ? 
              <input onChange={(e) => setData({...data, password: e.target.value})} className="h-[55px] md:h-[65px] flex-1  outline-none px-1 md:px-5 text-slate-900" type="password" placeholder="Password" />
              : 
              <button onClick={() => setShowPass(true)} className="bg-red-600 px-3 md:px-5 font-montserrat text-base md:text-xl">
                Get Started 
                <IoIosArrowForward className="inline" />
              </button>
            }
          </div>
          {
           error && 
           <p className="text-red-500 text-base mt-2 text-left ">
            {error}
           </p>
          }
         <button disabled={loading} onClick={register} className={`bg-red-600 p-2 px-3 rounded mt-5 ${showPass ? 'visible':'invisible'}`}>
          {
            loading ? 'Loading...' : 'Sign up'
          }
         </button>
        </div>
      </div>
    </>
    
  );
}

export default Signup;
