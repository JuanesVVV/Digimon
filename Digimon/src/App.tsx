import { BrowserRouter as Router, Route, Routes, Link } from 'react-router';
import './App.css'
import Home from './Home/index'
import FavoritosDetalle from './Favoritos/index' 

function App() {
  return (
    <Router>
      <nav className='c-menu'>
        <Link to="/home">Home</Link>
        <Link to="/favoritos">Favoritos</Link>
      </nav>

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/favoritos" element={<FavoritosDetalle />} />
        <Route path="/favoritos/:name" element={<FavoritosDetalle />} />
      </Routes>
    </Router>
  )
}

export default App;

