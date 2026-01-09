import { Form } from "react-bootstrap";

function SearchBar({ value, onChange }) {
  return (
    <Form.Control
      type="text"
      placeholder="Search..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Search Pokémon"
      style={{ width: 260 }}
    />
  );
}

export default SearchBar;
