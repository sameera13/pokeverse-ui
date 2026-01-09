import { Badge, Button, Card } from "react-bootstrap";

function PokemonCard({ pokemon, mode, onAdd, onRemove, disabled, alreadyAdded }) {
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
const level = (pokemon.id % 50) + 1;
  const move = "Tackle";
  const power = (pokemon.id % 40) + 10;

  const title = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

  return (
    <Card className="h-100 shadow-sm bg-light">
      <div className="d-flex justify-content-center pt-2">
        <img
          src={imageUrl}
          alt={pokemon.name}
          width={110}
          height={110}
          style={{ imageRendering: "pixelated" }}
        />
      </div>

      <Card.Body className="pt-2">
        <Card.Title className="fs-6 fw-bold mb-2">{title}</Card.Title>

        <div className="small text-muted mb-2">
          <div>{move} ({power})</div>
          <div>Level {level}</div>
        </div>

        {mode === "add" ? (
          <Button
            variant="success"
            size="sm"
            onClick={onAdd}
            disabled={disabled}
            className="w-100"
          >
            {alreadyAdded ? "Added" : "Add"}
          </Button>
        ) : (
          <Button
            variant="danger"
            size="sm"
            onClick={onRemove}
            className="w-100"
          >
            Remove
          </Button>
        )}

        {mode === "add" && alreadyAdded && (
          <div className="text-center mt-2">
            <Badge bg="secondary">In squad</Badge>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}

export default PokemonCard;
