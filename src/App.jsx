import './App.css'

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Home from './components/home';
import MovieDetails from './components/movie-details';
import SearchedMovies from './components/searched-movies';

function App() {

  return (
    <BrowserRouter>
   <header>
    <nav>
      <Link to="/">Home</Link>
    </nav>
   </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:title" element={<MovieDetails />} />
        <Route path="/search/:searchTerm" element={<SearchedMovies />} />
      </Routes>
    </BrowserRouter>
  
  )
}

export default App
