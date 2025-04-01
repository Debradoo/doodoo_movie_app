import React, { useEffect, useState } from 'react'
import { primaryBorderColor } from '../lib/colors'
import { BiSearch } from 'react-icons/bi'
import { IoClose } from "react-icons/io5";
import {PiSpinnerBold } from 'react-icons/pi';
import { Link } from 'react-router-dom';
import MovieCard from './movie-card';


function MovieTypePageComponent() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  
  

  useEffect(() => {
    (
      async () => {
        try {
            setLoading(true);
            const response = await fetch(`https://www.omdbapi.com/?apikey=83e168ef&s=Fast&type=movie`);
            if (!response.ok) {
              throw new Error("Error fetching movies");
            }
            const data = await response.json();

            if (data.Response === "True") {
              setMovies(data.Search)
            } else {
              setMovies([]);
            }
          
        } catch (error) {
          console.error("Error:", error);
        }finally{
          setLoading(false);
        }
    }
    )()
  }, []);

  if(loading) return <div className='flex items-center justify-center mt-20'>
         <PiSpinnerBold className='animate-spin'/>
       </div>

if(movies.length === 0) return <div>No movie found</div>
  return (
    <div className='mt-10 w-full'>
      <h2 className='text-2xl mb-4'>Movie Type: <span className='italic'>Movie</span></h2>
        <div className='grid gap-4'>
        {movies.map((movie)=>(
            <MovieCard key={movie.imdbID} movie={movie}/>
        ))}
        </div>
    </div>
  )
}

export default MovieTypePageComponent