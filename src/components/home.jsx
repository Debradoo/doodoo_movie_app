import React from 'react'
import SearchComponent from './search-component'
import MovieTypePageComponent from './movie-type-page'

function Home() {
  return (
    <div className='mt-4 flex flex-col items-center justify-center'>
        <SearchComponent/>
        <MovieTypePageComponent/>
    </div>
  )
}

export default Home