import React, { useEffect, useState } from 'react'
import { PiSpinnerBold } from 'react-icons/pi';
import MovieCard from './movie-card';

async function fetchAllMoviesByYear(year) {
  const apiKey = "83e168ef"; // Replace with your OMDB API key
  let page = 1;
  let allMovies = [];
  let totalResults = 0;

  try {
    do {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${apiKey}&s=movie&y=${year}&type=movie&page=${page}`
      );
      const data = await response.json();

      if (data.Response === "True") {
        if (page === 1) {
          totalResults = parseInt(data.totalResults, 10);
          console.log(`Total movies found: ${totalResults}`);
        }

        allMovies = allMovies.concat(data.Search);
        console.log(`Fetched page ${page}`);
        page++;
      } else {
        console.log("No more movies found:", data.Error);
        break;
      }
    } while (allMovies.length < totalResults);

    console.log(`Total movies fetched: ${allMovies.length}`);
    return allMovies;
  } catch (error) {
    console.error("Error:", error);
    return []
  }
}




function MoviesPageComponent() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults,setTotalResults] = useState(0);


  const apiKey = "83e168ef";
  const year = 2025;

  useEffect(() => {

    (
      async () => {
       
        try {
          setLoading(true);
          const response = await fetch(
            `https://www.omdbapi.com/?apikey=${apiKey}&s=movie&y=${year}&type=movie&page=${page}`
          );
          const data = await response.json();

          if (data.Response === "True") {
            setMovies(data.Search);
            if (page === 1) {
              setTotalResults(parseInt(data.totalResults, 10));
            }

          } else {
            console.log("No more movies found:", data.Error);
          }


        } catch (error) {
          console.error("Error:", error);
        } finally {
          setLoading(false);
        }
      }
    )()
  }, [page]);
 

  if (loading) return <div className='flex items-center justify-center mt-20'>
    <PiSpinnerBold className='animate-spin' />
  </div>

  if (movies.length === 0) return <div>No movie found</div>
  return (
    <div className='mt-10 w-full'>

      <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-4'>
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
      <footer className='flex items-center gap-2 mt-4 justify-end'>
      <Button text="Previous" setPage={setPage} disabled={page === 1}/>
      <Button text="Next" setPage={setPage} disabled={totalResults - (page * 10) < 10}/>
      </footer>
    </div>
  )
}

export default MoviesPageComponent

export const Button = ({ text, setPage,disabled }) => {

  return <button className='w-40' disabled={disabled}
    onClick={() => setPage(prv => text === "Next" ? ++prv : --prv)}
  >{text}</button>
}