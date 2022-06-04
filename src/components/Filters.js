import './Filters.scss';

function Filters(props) {
  const searchHasChanged = (event) => {
    props.onSearchChange(event.currentTarget.value);
  };
  const typeHasChanged = (event) => {
    props.onTypeChange(event.currentTarget.value);
  };
  const favoritesPokemons = () => {
    props.favorites(true);
  };
  const AllPokemons = () => {
    props.allPokemons();
  };
  return (
    <>
      <div>
        <div className="filters__favorites">
          <button
            onClick={AllPokemons}
            className={`filter__all ${props.favoritesList ? '' : 'pokemons'}`}
          >
            All
          </button>

          <button
            onClick={favoritesPokemons}
            className={`filter__favorites ${
              props.favoritesList ? 'pokemons' : ''
            }`}
          >
            Favorites
          </button>
        </div>
      </div>
      <div className="type-favorites">
        <input
          className="filter__search"
          placeholder="Search"
          type="search"
          id="name"
          name="name"
          value={props.searchValue}
          onChange={searchHasChanged}
        />
        <div className="select">
          <select
            name="types"
            id="types"
            onChange={typeHasChanged}
            className="filter__select"
          >
            <option value="">Type</option>
            {props.types.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
}

export default Filters;
