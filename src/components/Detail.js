import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getPokemonById } from '../services/api';
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
    return <Loading />;
  }
  return (
    <div>
      <img src={pokemon.image} alt={pokemon.name} />
      <section>
        <h2>{pokemon.name}</h2>
        <p>{pokemon.types.join(', ')}</p>
        <div>
          <p>CP: {pokemon.maxCP}</p>
          <p>HP: {pokemon.maxHP}</p>
        </div>
        <section>
          <div>
            <h3>Weight</h3>
            <p>
              {pokemon.weight.maximum} - {pokemon.weight.minimum}
            </p>
          </div>
          <div>
            <h3>Height</h3>
            <p>
              {pokemon.height.maximum} - {pokemon.height.minimum}
            </p>
          </div>
        </section>
      </section>
    </div>
  );
}

export default Detail;
