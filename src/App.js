import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Detail from './components/Detail';
import Home from './components/Home';
import { ReactComponent as PokedexLogo } from './pokedex-logo.svg';

function App() {
  return (
    <div>
      <header>
        <Link to="/">
          <PokedexLogo />
        </Link>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon/:id" element={<Detail />} />
        </Routes>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
