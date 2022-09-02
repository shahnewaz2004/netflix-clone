import React, {useEffect, useState} from 'react';
import ListedMovies from '../components/ListedMovies';
import {useNavigate, useParams} from 'react-router-dom';

function List() {

  const navigate = useNavigate();
  const {token} = useParams();
  const [movies, setMovies] = useState([]);

  const fetchListedMovie = async function(){
    const result = await fetch('https://localhost:9000/movie/fetch', {
        method: 'POST',
        headers: {
            'Content-type' : 'Application/json'
        },
        body: JSON.stringify({token})
    })

    const response = await result.json();
    if(!response.success){
        navigate('/');
    }else{
        setMovies(response.movies)
    }
  }

  useEffect(function(){
     fetchListedMovie();
  },[])

  return (
    <div>
        <ListedMovies movies={movies} token={token} />
    </div>
  )
}

export default List