import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getPokemonById } from '../services/api';
import './Detail.scss';
import Loading from './Loading';
function Detail() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState();
  useEffect(() => {
    getPokemonById(id).then((response) => {
      setPokemon(response);
      console.log(response);
    });
  }, [id]);
  if (!pokemon) {
    return (
      <div className="detail-container">
        <div className="loading">
          <Loading />;
        </div>
      </div>
    );
  }
  return (
    <div className="detail-container">
      <div className="pokemon">
        <img
          className="pokemon__image"
          src={pokemon.image}
          alt={pokemon.name}
        />
        <section className="pokemon__detail">
          <section className="pokemon__description">
            <h1 className="pokemon__name">{pokemon.name}</h1>
            <span className="pokemon__types">{pokemon.types.join(', ')}</span>
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
    </div>
  );
}

export default Detail;
