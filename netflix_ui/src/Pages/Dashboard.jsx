import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import DashNavbar from '../components/DashNavbar';
import Title from '../assets/homeTitle.webp';
import {FiInfo} from 'react-icons/fi';
import {FaPlay} from 'react-icons/fa';
import {API_KEY} from '../config.js';
import 'swiper/css/pagination';
import '../css/core.css';
import Cookies from 'js-cookie';

import Movies from '../components/Movies';

function Dashboard() {
    const navigate = useNavigate();
    const [cookie, setCookie] = useState('');
    const [release, setRelease] = useState([]);
    const [tv, setTv] = useState([]);
    const [blockbuster, setBlockbuser] =useState([]);

    const fetch_global = async (condition) => {
        // ADD YOUR TMDB API KEY TO THE CONFIG FILE 
        const result = await fetch(`https://api.themoviedb.org/3/${condition}?api_key=${API_KEY}`);
        const response = await result.json();
       
        // UPDATE THE TRENDING STATE BASED ON THE CONDITON 
        const arr = condition.split('/');
        if(arr.includes('all')){
            setRelease(response.results);
        }else if(arr.includes('discover')){
            setTv(response.results);
        }
        else{
            setBlockbuser(response.results);
        }
    }
 
    useEffect(function(){
        fetch_global('trending/all/week');
        fetch_global('trending/movie/day');
        fetch_global('discover/movie'); 
        const userToken = Cookies.get('netflix_id');
        setCookie(userToken);
    }, [window.location.pathname])
    
  return (
    <div>
        <div className="dashboard_hero w-screen bg-cover">
            <DashNavbar token={cookie} />
            <div className='z-100 px-[80px] absolute bottom-[150px]'>
            <img src={Title} alt='Image'/>
                <div className='space-x-5 mt-14'>
                    <button onClick={() => navigate(`/player/${cookie}/vvObT0eIWGlArLQx3K5wZ0uT812.jpg/616037`)} className='bg-gray-300 px-4 py-2 rounded font-montserrat font-semibold'>
                        <FaPlay className='inline mr-4' />
                        Play
                    </button>
                    <button className='bg-slate-400/30 text-gray-300 px-4 py-2 rounded font-montserrat font-semibold'>
                        <FiInfo className='inline mr-4' />
                        More info
                    </button>
                </div>
            </div>
        </div>

        {/* MOVIES  */}
            <Movies movies={release} title='New Release' token={cookie} poster={true} id='tv' mt='mt-[50px]' />
            <Movies movies={tv} title='Tv Shows' token={cookie} poster={false} id='' />
            <Movies movies={blockbuster} title='Blockbuster Movies' token={cookie} poster={false} id='movies' />
        
    </div>
  )
}

export default Dashboard;