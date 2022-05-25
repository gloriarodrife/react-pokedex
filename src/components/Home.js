import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import getPokemons from '../services/api';
import './Home.scss';

const Home = () => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    getPokemons().then((response) => setPokemons(response));
  }, []);

  const renderCard = (pokemon) => {
    return (
      <div className="card">
        <div className="card__image">
          <img src={pokemon.image} alt={pokemon.name} />
        </div>
        <div className="card__footer">
          <h2 className="card__title">{pokemon.name}</h2>
          <span className="card__types">{pokemon.types.join(', ')}</span>
        </div>
      </div>
    );
  };

  return (
    <>
      <ul className="list">
        {pokemons.map((pokemon) => (
          <li key={pokemon.id}>
            <Link to={`/pokemon/${pokemon.id}`}>{renderCard(pokemon)}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Home;
