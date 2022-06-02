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

function Detail() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState();

  const handleClick = (event) => {
    event.preventDefault();
    postPokemonFavorite(pokemon.id).then((response) => {
      setPokemon(response);
    });
  };

  const handleClickUnfavorite = (event) => {
    event.preventDefault();
    postPokemonUnFavorite(pokemon.id).then((response) => {
      setPokemon(response);
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
            };

            return (
              <Link to={`/pokemon/${evolution.id}`} key={evolution.id}>
                <PokemonCard
                  pokemon={pokemon}
                  onUnfavoriteClick={handleClickUnfavorite}
                  onFavoriteClick={handleClick}
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
                onClick={handleClickUnfavorite}
              />
            ) : (
              <Heart className="heart" onClick={handleClick} />
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
