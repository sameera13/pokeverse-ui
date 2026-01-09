import { Row, Col } from "react-bootstrap";
import PokemonCard from "./PokemonCard";

function SquadRow({ squad, onRemove }) {
  return (
    <>
      <h2 className="text-center fw-bold mb-3">My squad ({squad.length})</h2>

      {squad.length === 0 ? (
        <p className="text-center text-muted">
          Add up to 6 Pokémon to your squad.
        </p>
      ) : (
        <Row className="g-4 justify-content-center mb-3">
          {squad.map((p) => (
            <Col key={p.id} xs={6} sm={4} md={3} lg={2}>
              <PokemonCard
                pokemon={p}
                mode="remove"
                onRemove={() => onRemove(p.id)}
              />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
}

export default SquadRow;
