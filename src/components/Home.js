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
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const limit = 20;

  useEffect(() => {
    setLoading(true);
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
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset, filterName]);

  const fetchMorePokemons = () => {
    setOffset(offset + limit);
  };

  const renderContent = () => {
    if (loading && !pokemons.length) {
      return (
        <div className="home-container">
          <div className="loading">
            <Loading />
          </div>
        </div>
      );
    }
    if (!loading && !pokemons.length) {
      return <h1>There are no pokemons!</h1>;
    }
    return (
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
    );
  };
  return (
    <div className="home-container">
      <Filters setFilterName={setFilterName} filterName={filterName} />
      {renderContent()}
    </div>
  );
};

export default Home;
