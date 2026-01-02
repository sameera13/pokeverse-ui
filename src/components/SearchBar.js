import { Form } from "react-bootstrap";

function SearchBar({ value, onChange }) {
  return (
    <Form.Control
      type="text"
      placeholder="Search Pokémon..."
      className="w-50 mx-auto mb-4"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Search Pokémon"
    />
  );
}

export default SearchBar;
