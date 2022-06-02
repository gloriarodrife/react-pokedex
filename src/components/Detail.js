import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { ReactComponent as HeartFavorite } from '../images/heart-favorite.svg';
import { ReactComponent as Heart } from '../images/heart.svg';
import { ReactComponent as SoundIcon } from '../images/sound-full.svg';
import {
  getPokemonById,
  postPokemonFavorite,
  postPokemonUnFavorite,
} from '../services/api';

import './Detail.scss';
import Loading from './Loading';
import PokemonCard from './PokemonCard';
const duplicates = (arr) => {
  const pokemonsMap = arr.map((pokemon) => {
    return [pokemon.id, pokemon];
  });
  return [...new Map(pokemonsMap).values()];
};
function Detail() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState();

  const addPokemonToFavorites = () => {
    postPokemonFavorite(pokemon.id).then((response) => {
      setPokemon(response);
    });
  };

  const removePokemonToFavorite = () => {
    postPokemonUnFavorite(pokemon.id).then((response) => {
      setPokemon(response);
    });
  };

  const favorite = (id) => {
    postPokemonFavorite(id).then((response) => {
      setPokemon({
        ...pokemon,
        evolutions: duplicates([...pokemon.evolutions, response]),
      });
    });
  };

  const unFavorite = (id) => {
    postPokemonUnFavorite(id).then((response) => {
      setPokemon({
        ...pokemon,
        evolutions: duplicates([...pokemon.evolutions, response]),
      });
    });
  };
  useEffect(() => {
    getPokemonById(id).then((response) => {
      setPokemon(response);
    });
  }, [id]);

  if (!pokemon) {
    return (
      <div className="detail-container">
        <div className="loading">
          <Loading />
        </div>
      </div>
    );
  }

  const renderEvolutions = () => {
    if (pokemon.evolutions.length === 0) {
      return;
    }

    return (
      <section className="evolutions">
        <h2>Evolutions</h2>
        <div className="evolutions__detail">
          {pokemon.evolutions.map((evolution) => {
            const pokemon = {
              name: evolution.name,
              image: evolution.image,
              isFavorite: evolution.isFavorite,
              id: evolution.id,
            };

            return (
              <Link to={`/pokemon/${evolution.id}`} key={evolution.id}>
                <PokemonCard
                  pokemon={pokemon}
                  onFavoriteClick={favorite}
                  onUnfavoriteClick={unFavorite}
                />
              </Link>
            );
          })}
        </div>
      </section>
    );
  };

  return (
    <div className="detail-container">
      <div className="pokemon">
        <img
          className="pokemon__image"
          src={pokemon.image}
          alt={pokemon.name}
        />
        <div className="pokemon__sound">
          <SoundIcon
            onClick={() => {
              let audio = new Audio(pokemon.sound);
              audio.play();
            }}
          />
        </div>
        <section className="pokemon__detail">
          <section className="pokemon__description">
            <div>
              <h1 className="pokemon__name">{pokemon.name}</h1>
              <span className="pokemon__types">{pokemon.types.join(', ')}</span>
            </div>
            {pokemon.isFavorite ? (
              <HeartFavorite
                className="heart"
                onClick={removePokemonToFavorite}
              />
            ) : (
              <Heart className="heart" onClick={addPokemonToFavorites} />
            )}
          </section>
          <section className="pokemon__stats">
            <div className="pokemon__stat">
              <div className="bar bar-top"></div>
              <span className="stat">CP: {pokemon.maxCP}</span>
            </div>
            <div className="pokemon__stat">
              <div className="bar bar-bottom"></div>
              <span className="stat">HP: {pokemon.maxHP}</span>
            </div>
          </section>
          <section className="pokemon__features">
            <div className="pokemon__feature">
              <span className="feature__title">Weight</span>
              <span>
                {pokemon.weight.maximum} - {pokemon.weight.minimum}
              </span>
            </div>
            <div className="pokemon__feature ">
              <span className="feature__title">Height</span>
              <span>
                {pokemon.height.maximum} - {pokemon.height.minimum}
              </span>
            </div>
          </section>
        </section>
      </div>
      {renderEvolutions()}
    </div>
  );
}

export default Detail;
