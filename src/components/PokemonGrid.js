import { Row, Col } from "react-bootstrap";
import PokemonCard from "./PokemonCard";

function PokemonGrid({ pokemon }) {
  return (
    <Row className="g-4">
      {pokemon.map((p, index) => (
        <Col xs={6} md={4} lg={3} key={p.name}>
          <PokemonCard pokemon={p} id={index + 1} />
        </Col>
      ))}
    </Row>
  );
}

export default PokemonGrid;
