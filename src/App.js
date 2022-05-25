import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';

function App() {
  return (
    <div>
      <header>
        <h1>Pokédex</h1>
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
