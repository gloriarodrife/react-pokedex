import { ReactComponent as HeartFavorite } from '../images/heart-favorite.svg';
import { ReactComponent as Heart } from '../images/heart.svg';

import './PokemonCard.scss';
function PokemonCard(props) {
  const { pokemon } = props;
  const handleClick = (event) => {
    event.preventDefault();
    const id = pokemon.id;
    props.postPokemonFavorite(id);
  };

  const handleClickUnfavorite = (event) => {
    event.preventDefault();
    const id = pokemon.id;
    props.postPokemonUnFavorite(id);
  };

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
        {pokemon.isFavorite ? (
          <HeartFavorite className="heart" onClick={handleClickUnfavorite} />
        ) : (
          <Heart className="heart" onClick={handleClick} />
        )}
      </div>
    </div>
  );
}

export default PokemonCard;
