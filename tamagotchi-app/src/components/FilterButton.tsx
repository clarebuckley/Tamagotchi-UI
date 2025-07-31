function FilterButton(props) {
  return (
    <button
      className="filterButton"
      type="button"
      aria-pressed={props.isPressed}
      onClick={() => props.setFilter(props.name)}>
      <span>{props.name}</span>
      <span className="visually-hidden"> tasks</span>
    </button>
  );
}

export default FilterButton;
