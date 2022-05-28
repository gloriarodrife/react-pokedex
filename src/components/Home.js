import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';
import getPokemons from '../services/api';
import './Home.scss';
import Loading from './Loading';

const Home = () => {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonsCount, setPokemonsCount] = useState();
  const [offset, setOffset] = useState(0);
  const limit = 20;

  useEffect(() => {
    getPokemons({ limit: String(limit), offset: String(offset) }).then(
      (response) => {
        setPokemonsCount(response.count);
        setPokemons([...pokemons, ...response.items]);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset]);

  const fetchMorePokemons = () => {
    setOffset(offset + limit);
  };

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
    <div className="container">
      <div role="list">
        <InfiniteScroll
          className="list"
          dataLength={pokemons.length}
          next={fetchMorePokemons}
          hasMore={pokemons.length <= pokemonsCount - 1}
          loader={
            <div className="loader">
              <Loading />
            </div>
          }
        >
          {pokemons.map((pokemon) => (
            <div role="listitem" key={pokemon.id}>
              <Link to={`/pokemon/${pokemon.id}`}>{renderCard(pokemon)}</Link>
            </div>
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Home;
