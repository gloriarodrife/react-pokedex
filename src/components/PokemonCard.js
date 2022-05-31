import { ReactComponent as Heart } from '../images/heart.svg';
import './PokemonCard.scss';

function PokemonCard(props) {
  const { pokemon } = props;

  return (
    <div className="card">
      <div className="card__image">
        <img src={pokemon.image} alt={pokemon.name} />
      </div>
      <div className="card__footer">
        <div>
          <h2 className="card__title">{pokemon.name}</h2>
          {pokemon.types && (
            <span className="card__types">{pokemon.types.join(', ')}</span>
          )}
        </div>
        <Heart className="heart" />
      </div>
    </div>
  );
}

export default PokemonCard;
