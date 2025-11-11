export function PostSorting({ fields = [], value, orderValue, onOrderChange }) {
  return (
    <div>
      <label htmlFor="sort-by">Sort By:</label>
      <select
        name="sort-by"
        id="sort-by"
        value={value}
        onChange={(e) => e.target.value}
      >
        {fields.map((field) => (
          <option key={field} value={field}>
            {field}
          </option>
        ))}
      </select>
      {"/"}
      <label htmlFor="sort-order">Sort Order:</label>
      <select
        name="sort-order"
        id="sort-order"
        value={orderValue}
        onChange={(e) => onOrderChange(e.target.value)}
      >
        <option value={"ascending"}>ascending</option>
        <option value={"desdending"}>desdending</option>
      </select>
    </div>
  );
}
