import React from 'react'
import { primaryBorderColor } from '../lib/colors'

function MovieCard({movie}) {

    if(!movie) return null
  return (
    <div className={`${primaryBorderColor} border-2 w-full h-96`}>
        <img src={movie.Poster} alt={movie.Title} className='w-full h-72 object-cover mb-4'/>
        <div className='flex flex-col items-start p-2'>
        <p className='text-sm'>Title: {movie.Title}</p>
        <p className='text-sm'>Type: {movie.Type}</p>
        <p className='text-sm'>Released Year: {movie.Year}</p>
        </div>
        
    </div>
  )
}

export default MovieCard