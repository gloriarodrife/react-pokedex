import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import { ReactComponent as PokedexLogo } from './pokedex-logo.svg';

function App() {
  return (
    <div>
      <header>
        <PokedexLogo />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon/:id" element={<p>Detail</p>} />
        </Routes>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
