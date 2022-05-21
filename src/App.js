import { Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div>
      <header>
        <h1>Pokédex</h1>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<p>Home</p>} />
          <Route path="/pokemon/:id" element={<p>Detail</p>} />
        </Routes>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
