import './Filters.scss';
function Filters(props) {
  const handleInput = (event) => {
    props.setFilterName(event.currentTarget.value);
  };
  const hanldeType = (event) => {
    props.setFilterType(event.currentTarget.value);
  };
  return (
    <div className="filters">
      <input
        className="filter__search"
        placeholder="Search"
        type="search"
        id="name"
        name="name"
        value={props.filterName}
        onChange={handleInput}
      />
      <div className="select">
        <select
          name="types"
          id="types"
          onChange={hanldeType}
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
  );
}

export default Filters;
