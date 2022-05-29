import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { ReactComponent as SoundIcon } from '../images/sound-full.svg';
import { getPokemonById } from '../services/api';
import './Detail.scss';
import Loading from './Loading';
import PokemonCard from './PokemonCard';
function Detail() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState();
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
          {pokemon.evolutions.map((pokemon) => {
            return (
              <Link to={`/pokemon/${pokemon.id}`} key={pokemon.id}>
                <PokemonCard pokemon={pokemon} />
              </Link>
            );
          })}
        </div>
      </section>
    );
  };
  let audio = new Audio(pokemon.sound);
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
              audio.play();
            }}
          />
        </div>
        <section className="pokemon__detail">
          <section className="pokemon__description">
            <h1 className="pokemon__name">{pokemon.name}</h1>
            <span className="pokemon__types">{pokemon.types.join(', ')}</span>
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
