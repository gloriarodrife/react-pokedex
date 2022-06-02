import { ReactComponent as HeartFavorite } from '../images/heart-favorite.svg';
import { ReactComponent as Heart } from '../images/heart.svg';

import './PokemonCard.scss';
function PokemonCard(props) {
  const { pokemon } = props;
  const favoriteHasClicked = (event) => {
    event.preventDefault();
    const id = pokemon.id;
    props.onFavoriteClick(id);
  };

  const unfavoriteHasClicked = (event) => {
    event.preventDefault();
    const id = pokemon.id;
    props.onUnfavoriteClick(id);
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
          <HeartFavorite className="heart" onClick={unfavoriteHasClicked} />
        ) : (
          <Heart className="heart" onClick={favoriteHasClicked} />
        )}
      </div>
    </div>
  );
}

export default PokemonCard;
