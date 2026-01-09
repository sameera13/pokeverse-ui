import { Row, Col } from "react-bootstrap";
import PokemonCard from "./PokemonCard";

function PokemonGrid({ pokemon, squad, onAdd, maxSquad }) {
  const isInSquad = (id) => squad.some((p) => p.id === id);

  return (
    <Row className="g-4 mt-1">
      {pokemon.map((p) => {
        const alreadyAdded = isInSquad(p.id);
        const squadFull = squad.length >= maxSquad;

        return (
          <Col key={p.id} xs={6} md={4} lg={3}>
            <PokemonCard
              pokemon={p}
              mode="add"
              disabled={alreadyAdded || squadFull}
              alreadyAdded={alreadyAdded}
              onAdd={() => onAdd(p)}
            />
          </Col>
        );
      })}
    </Row>
  );
}

export default PokemonGrid;
