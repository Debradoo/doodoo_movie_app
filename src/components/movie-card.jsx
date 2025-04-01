import React from 'react'
import { primaryBorderColor } from '../lib/colors'

function MovieCard({movie}) {

    if(!movie) return null
console.log(movie)
  return (
    <div className={`${primaryBorderColor} border-2 w-full`}>
        <img src={movie.Poster} alt={movie.Title} className='w-full object-fill mb-4'/>
        <div className='flex flex-col items-start p-2'>
        <p>Title: {movie.Title}</p>
        <p>Type: {movie.Type}</p>
        <p>Released Year: {movie.Year}</p>
        </div>
        
    </div>
  )
}

export default MovieCard