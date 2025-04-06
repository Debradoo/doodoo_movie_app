import React, { useEffect, useState } from 'react'
import { PiSpinnerBold } from 'react-icons/pi';

import { useParams } from 'react-router-dom';
import MovieCard from './movie-card';
import { Button } from './movie-type-page';


function SearchedMovies() {

    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const { searchTerm } = useParams();

    useEffect(() => {
        (
            async () => {
                try {

                    setLoading(true);
                    const response = await fetch(`https://www.omdbapi.com/?apikey=83e168ef&s=${searchTerm}&page=${page}`);
                    if (response.ok) {
                        const data = await response.json();
                       
                        setMovies(data.Search);
                        if (page === 1) {
                            setTotalResults(parseInt(data.totalResults, 10));
                          }
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
        <div className=' mt-10'>
            <h2 className='text-xl'>Search results for: {searchTerm}</h2>
            <p>Total results: {totalResults} movies</p>
            <div className='grid md:grid-cols-2 gap-4 mt-6'>

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

export default SearchedMovies