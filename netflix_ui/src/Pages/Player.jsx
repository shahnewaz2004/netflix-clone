import React, { useState, useEffect } from 'react';
import {BsFillArrowLeftSquareFill} from 'react-icons/bs';
import {BsBookmarkPlusFill} from 'react-icons/bs';
import {MdBookmarkRemove} from 'react-icons/md';
import {API_KEY} from '../config.js';
import {useNavigate, useParams} from 'react-router-dom';

function Player() {
    const navigate = useNavigate();
    const [key, setKey] = useState('');
    const {token, poster, videoId} = useParams();
    const [isAdded, setIsAdded] = useState(false);

    const fetch_movie = async function(){
      const result = await fetch(`https://api.themoviedb.org/3/movie/${videoId}/videos?api_key=${API_KEY}`);
      const response = await result.json();
      setKey(response.results[0].key);
    }

    const addList = async function(){
      const result = await fetch('https://localhost:9000/movie/add',{
        method: 'POST',
        headers: {
          "Content-type":'Application/json'
        },
        body: JSON.stringify({token, poster, videoId})
      });
      const response = await result.json();
      setIsAdded(response.success);
      alert(response.message);
    }

    const deleteList = async function(){
      const result = await fetch('https://localhost:9000/movie/delete', {
        method: 'POST',
        headers: {
          'Content-type' : 'Application/json'
        },
        body: JSON.stringify({token, videoId})
      })

      const response = await result.json();
      if(!response.success){
        alert(response.message)
      }else{
       setIsAdded(!response.success);
      }
    }

    // Check If the movie is already added to the list 
    const checkMovie = async function(){
      const result = await fetch('https://localhost:9000/movie/check', {
        method: 'POST',
        headers: {
          'Content-type' : 'Application/json'
        },
        body: JSON.stringify({token, videoId})
      })

      const response = await result.json();
      if(!response.success){
        alert(response.message)
      }else{
       setIsAdded(response.success);
      }
    }

    useEffect(function(){
        fetch_movie();
        checkMovie();
    }, [videoId]);
  
  return (
    <div className=''>
        <BsFillArrowLeftSquareFill 
            className='text-white absolute top-6 left-6 text-xl cursor-pointer z-20' 
            onClick={() => navigate(-1)}
        />
        {
          !isAdded ?
            <BsBookmarkPlusFill 
              className='text-white absolute top-6 right-8 text-4xl cursor-pointer z-20' 
              onClick={addList}
            /> 
            :
            <MdBookmarkRemove 
            className='text-red-600 absolute top-6 right-8 text-4xl cursor-pointer z-20' 
            onClick={deleteList}
            />
        }
        
        
        { 
              key && <div className='h-screen w-screen flex items-center justify-center'>
                <iframe className='h-[80%] w-[80%]'
                 src={`https://www.youtube-nocookie.com/embed/${key}?autoplay=1`} 
                 frameBorder="0" allow="autoplay; picture-in-picture"></iframe>  
              </div>
        }
    </div>
  )
}

export default Player;