import React, { useEffect, useState } from 'react'
import { PiSpinnerBold } from 'react-icons/pi';

import { useParams } from 'react-router-dom';
import { primaryBorderColor } from '../lib/colors';


function MovieDetails() {

    const [movie,setMovie] = useState(null)
    const [loading,setLoading] = useState(false);


    const { title } = useParams();

      useEffect(() => {
        (
          async () => {
            try {
              if (title) {
                setLoading(true);
                const response = await fetch(`https://www.omdbapi.com/?apikey=83e168ef&t=${title}`);
                if (response.ok) {
                    const data = await response.json();
                    setMovie(data);
                  }
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

      if(movie === null) return <div>No movie found</div>
  return (
    <div className='mt-10'>
         <div className={`${primaryBorderColor} border-2 w-full`}>
                <img src={movie.Poster} alt={movie.Title} className='w-full object-cover mb-4'/>
                <div className='flex flex-col items-start p-2'>
                <p className='text-sm'>Title: {movie.Title}</p>
                <p className='text-sm'>Type: {movie.Type}</p>
                <p className='text-sm'>Released Year: {movie.Year}</p>
                </div>
                
            </div>
    </div>
  )
}

export default MovieDetails