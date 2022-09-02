import React from 'react';
import {AiFillPlayCircle} from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

function ListedMovies({movies, token}) {
    const navigate = useNavigate();

  return (
    <div>
        <div className='mt-[60px] mb-10  px-[80px] relative'>
            <h3 className='text-white font-poppins text-2xl font-semibold mb-8'>
                Your listed movie
            </h3>
            
            <div className="flex flex-wrap">
                {
                     movies.map((value, index) =>{
                        return(
                    
                            <div key={index} className='slider_items relative mr-8 mb-8'>
                                <img className='rounded slider_image hover:scale-105 transition duration-300 cursor-pointer' 
                                    src={`https://image.tmdb.org/t/p/w400/${value.poster}`} 
                                    onClick={() => navigate(`/player/${token}/${value.poster}/${value.videoId}`)} 
                                />

                                {/* When hover to the .slider_items this part will be visible  */}
                                <div className='play_icon_container pointer-events-none absolute top-1/2 left-1/2 transition duration-300'>
                                    <div className="play_icon flex items-center justify-center">
                                        <AiFillPlayCircle className=' text-white/70 text-6xl' />
                                    </div>
                                </div>
                            </div>
                        ) 
                    })
                }
            </div>
            <button
             onClick={() => navigate('/dashboard')}
             className='text-white bg-red-600 rounded py-2 px-3 font-poppins absolute top-0 right-8 text-base cursor-pointer z-20'>
                Back to home
            </button>
        </div>
    </div>
  )
}

export default ListedMovies