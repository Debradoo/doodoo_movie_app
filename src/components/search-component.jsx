import React, { useEffect, useState } from 'react'
import { primaryBorderColor, primaryTextColor } from '../lib/colors'
import { BiSearch } from 'react-icons/bi'
import { IoClose } from "react-icons/io5";
import {PiSpinnerBold } from 'react-icons/pi';
import { Link } from 'react-router-dom';


function SearchComponent() {
  const [show, setShow] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  
  

  useEffect(() => {
    (
      async () => {
        try {
          if (searchTerm) {
            setLoading(true);
            const response = await fetch(`https://www.omdbapi.com/?apikey=83e168ef&s=${searchTerm}&type=movie`);
            if (!response.ok) {
              throw new Error("Error fetching movies");
            }
            const data = await response.json();

            if (data.Response === "True") {
              setMovies(data.Search)
            } else {
              setMovies([]);
            }
          }
        } catch (error) {
          console.error("Error:", error);
        }finally{
          setLoading(false);
        }
      }
    )()
  }, [searchTerm]);

  const onChange = (e) => {
    setSearchTerm(e.target.value)
  }
  return (
    <div
      className={`${primaryBorderColor} border-1 w-80 h-10 rounded-full
    flex items-center justify-between p-4 relative
    `}

    >
      <input className='outline-none'
        placeholder='Search movie by title'
        onFocus={() => setShow(true)}
        onChange={onChange}

      />
      {show && searchTerm? <IoClose onClick={() => setShow(false)} /> :
        <BiSearch />}
      <div className={`${show ? "flex flex-col" : "hidden"}
     items-center justify-center gap-2 w-80 bg-white p-2 text-black
      absolute top-12 right-0`}>
       {loading ?  <PiSpinnerBold className='animate-spin'/> :
       <>
        {searchTerm && movies.length === 0 ? <p className='italic'>
          No movie found</p>
          : movies.map((movie, index) => {
            return <p key={index}
            
            >
              <Link to={`/movie/${movie.Title}`} 
              >{movie.Title}</Link>
            </p>
          })}
       </>
       }
       
      </div>
    </div>
  )
}

export default SearchComponent