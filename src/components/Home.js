import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';
import {
  getPokemons,
  getPokemonsTypes,
  postPokemonFavorite,
  postPokemonUnFavorite,
} from '../services/api';
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
  const [types, setTypes] = useState([]);
  const [favoritesList, setFavoritesList] = useState('');
  const [filterName, setFilterName] = useState('');
  const [filterType, setFilterType] = useState('');
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
      isFavorite: String(favoritesList),
      type: filterType,
    }).then((response) => {
      const newPokemons = offset
        ? sort(duplicates([...pokemons, ...response.items]), 'id')
        : response.items;

      setPokemonsCount(response.count);
      setPokemons(newPokemons);
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset, filterName, filterType, favoritesList]);

  useEffect(() => {
    getPokemonsTypes().then((response) => setTypes(response.sort()));
  }, []);

  const favorite = (id) => {
    postPokemonFavorite(id).then((response) => {
      const newPokemons = sort(duplicates([...pokemons, response]), 'id');
      setPokemons(newPokemons);
    });
  };

  const unFavorite = (id) => {
    postPokemonUnFavorite(id).then((response) => {
      const newPokemons = sort(duplicates([...pokemons, response]), 'id');
      setPokemons(newPokemons);
    });
  };
  const fetchMorePokemons = () => {
    // If there are more pokemons in this search, fetch them
    if (pokemons.length < pokemonsCount) {
      setOffset(offset + limit);
    }
  };

  const onChangeFilterType = (type) => {
    setFilterType(type);
    setOffset(0);
  };
  const onChangeFilterName = (name) => {
    setFilterName(name);
    setOffset(0);
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
                <PokemonCard
                  pokemon={pokemon}
                  onFavoriteClick={favorite}
                  onUnfavoriteClick={unFavorite}
                />
              </Link>
            </div>
          ))}
        </InfiniteScroll>
      </div>
    );
  };

  return (
    <div className="home-container">
      <Filters
        onSearchChange={onChangeFilterName}
        searchValue={filterName}
        onTypeChange={onChangeFilterType}
        types={types}
        favorites={setFavoritesList}
        allPokemons={setFavoritesList}
      />
      {renderContent()}
    </div>
  );
};

export default Home;
