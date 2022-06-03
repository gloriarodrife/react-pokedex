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
    props.allPokemons('');
  };
  return (
    <>
      <div>
        <button onClick={AllPokemons}>All</button>

        <button onClick={favoritesPokemons}>Favorites</button>
      </div>
      <div className="filters">
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
