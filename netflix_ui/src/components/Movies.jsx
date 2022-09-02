import React from 'react';
import {AiFillPlayCircle} from 'react-icons/ai';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import { useNavigate } from 'react-router-dom';

function Movies({movies, title, token, poster, id, mt}) {
    const navigate = useNavigate();

  return (
    <div id={id}>
        <div className={`${mt} mb-7 md:mb-10 px-[30px] md:px-[50px] lg:px-[80px]`}>
            <h3 className='text-white font-poppins md:text-xl lg:text-2xl font-semibold mb-5 md:mb-6 lg:mb-8'>
               {title}
            </h3>
             <Swiper modules={[Pagination]}
                    slidesPerView={5}
                    breakpoints={{
                        0:{
                            slidesPerView: 2,
                            spaceBetween: 10
                        },
                        450: {
                          slidesPerView: 3,
                          spaceBetween: 15
                        },
                        900: {
                          slidesPerView: 4,
                          spaceBetween: 20
                        },
                        1000: {
                            slidesPerView: 5,
                            spaceBetween: 20
                        }
                    }}

                    className='slider'
            >
                {
                     movies.map((value, index) =>{
                        return(
                            <SwiperSlide key={index} className="relative slider_items" >
                                    <img className='rounded slider_image hover:scale-110 transition duration-300 cursor-pointer' 
                                        src={`https://image.tmdb.org/t/p/w300/${poster ? value.poster_path : value.backdrop_path}`} 
                                        onClick={() => navigate(`/player/${token}${value.backdrop_path}/${value.id}`)} 
                                    />

                                    {/* When hover to the .slider_items this part will be visible  */}
                                    <div className='play_icon_container pointer-events-none absolute top-1/2 left-1/2 transition duration-300'>
                                        <div className="play_icon flex items-center justify-center">
                                            <AiFillPlayCircle className=' text-white/70 text-6xl' />
                                        </div>
                                    </div>
                            </SwiperSlide>
                        ) 
                    })
                }
            </Swiper>
        </div>
    </div>
  )
}

export default Movies