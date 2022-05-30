import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';
import { getPokemons } from '../services/api';
import Filters from './Filters';
import './Home.scss';
import Loading from './Loading';
import PokemonCard from './PokemonCard';

const duplicates = (arr) => {
  const pokemonsMap = arr.map((pokemon) => {
    return [pokemon.id, pokemon];
  });
  return [...new Map(pokemonsMap).values()];
};
const sort = (list, key) => {
  return list.sort((a, b) => (a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0));
};

const Home = () => {
  const [pokemons, setPokemons] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [pokemonsCount, setPokemonsCount] = useState();
  const [offset, setOffset] = useState(0);
  const limit = 20;

  useEffect(() => {
    getPokemons({
      limit: String(limit),
      offset: String(offset),
      search: filterName.toLowerCase(),
    }).then((response) => {
      setPokemonsCount(response.count);

      const newPokemons = filterName
        ? response.items
        : sort(duplicates([...pokemons, ...response.items]), 'id');

      setPokemons(newPokemons);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset, filterName]);

  const fetchMorePokemons = () => {
    setOffset(offset + limit);
  };

  if (!pokemons.length) {
    return (
      <div className="home-container">
        <div className="loading">
          <Loading />
        </div>
      </div>
    );
  }

  return (
    <div className="home-container">
      <Filters setFilterName={setFilterName} filterName={filterName} />
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
              <Link to={`/pokemon/${pokemon.id}`}>
                <PokemonCard pokemon={pokemon} />
              </Link>
            </div>
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Home;
