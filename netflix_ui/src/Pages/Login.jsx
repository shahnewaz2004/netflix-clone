import React, {useState, useEffect} from "react";
import {Link, useNavigate} from 'react-router-dom';
import Navbar from "../components/Navbar";
import Cookies from 'js-cookie';

function Login() {

  const navigate = useNavigate();
  useEffect(function(){
    const token = Cookies.get('netflix_id');
    if(token){
      navigate('/dashboard');
    }
  }, [])

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState({
    email: '',
    password: ''
  })

  const login = async function(){
    setLoading(true);
    const result = await fetch('https://localhost:9000/user/login', {
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
      Cookies.set('netflix_id', response.token);
      navigate('/dashboard');
    }
    setLoading(false);
  }

  return (
    <>
    <div className="w-screen h-screen bg-cover bg-center imagebox"></div>
      <Navbar page={'login'} />
      <div className="absolute top-0 w-full h-full flex items-center justify-center">
        <div className="w-[80%] md:w-[50%] lg:w-[40%] xl:w-[30%] py-10 login_form space-y-7">
          {
          error && <p className="text-red-600 font-inter text-center text-sm">
            {error}
          </p>
          }
          <div className="w-[80%] mx-auto">
            <input onChange={e => setData({...data, email:e.target.value})} className="w-[100%] px-3 h-[50px] rounded-sm outline-none bg-white/90" type="email" placeholder="Email address"/>
          </div>
          <div className="w-[80%] mx-auto">
            <input onChange={e => setData({...data, password:e.target.value})} className="w-[100%] px-3 h-[50px] rounded-sm outline-none bg-white/90" type="password" placeholder="Password"/>
          </div>
          <div className="w-[80%] mx-auto">
            <button disabled={loading} onClick={login} className="bg-red-600 w-[100%] px-3 h-[50px] rounded-sm text-white cursor-pointer">
             {
              loading ? 'Logging...' : 'Login'
             }
            </button>
          </div>
          <p className="text-white text-center font-poppins text-sm md:text-base">Don't have an account yet? <Link to='/' className="underline">Create here</Link></p>
        </div>
      </div>
    </>
  );
}

export default Login;
