import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import getPokemons from '../services/api';

const Home = () => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    getPokemons().then((response) => setPokemons(response));
  }, []);

  const renderList = (pokemons) => {
    return pokemons.map((pokemon) => {
      return (
        <Link to={`/pokemon/${pokemon.id}`} key={pokemon.id}>
          <li className="card">
            <img src={pokemon.image} alt={pokemon.name} />
            <h2>{pokemon.name}</h2>
            <ul>
              {pokemon.types.map((type, index) => {
                return (
                  <li key={index}>
                    <p>{type}</p>
                  </li>
                );
              })}
            </ul>
          </li>
        </Link>
      );
    });
  };

  return (
    <>
      <ul>{renderList(pokemons)}</ul>
    </>
  );
};

export default Home;
