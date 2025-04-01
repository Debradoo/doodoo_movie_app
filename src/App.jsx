import './App.css'

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Home from './components/home';
import MovieDetails from './components/movie-details';

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
      </Routes>
    </BrowserRouter>
  
  )
}

export default App
