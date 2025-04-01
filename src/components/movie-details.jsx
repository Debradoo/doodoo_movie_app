import React, { useEffect, useState } from 'react'
import { PiSpinnerBold } from 'react-icons/pi';

import { useParams } from 'react-router-dom';


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
        {movie.Title}
    </div>
  )
}

export default MovieDetails