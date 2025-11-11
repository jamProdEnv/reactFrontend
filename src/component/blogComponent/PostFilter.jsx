export function PostFilter({ field, value, onChange }) {
  return (
    <div>
      <label htmlFor={`field - ${field}`}>{field}</label>
      <input
        type="text"
        name={`filter-${field}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
