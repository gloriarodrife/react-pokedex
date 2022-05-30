function Filters(props) {
  const handleInput = (event) => {
    props.setFilterName(event.currentTarget.value);
  };
  return (
    <div>
      <input
        placeholder="Search"
        type="search"
        id="name"
        name="name"
        value={props.filterName}
        onChange={handleInput}
      />
    </div>
  );
}

export default Filters;
