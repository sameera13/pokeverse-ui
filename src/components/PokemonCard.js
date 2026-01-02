import { Card, Button } from "react-bootstrap";

function PokemonCard({ pokemon, id }) {
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  return (
    <Card className="h-100 text-center shadow-sm bg-light">
      <Card.Img
        variant="top"
        src={imageUrl}
        alt={pokemon.name}
        style={{ width: "120px", margin: "10px auto" }}
      />
      <Card.Body>
        <Card.Title className="text-capitalize">{pokemon.name}</Card.Title>
        <Button variant="primary" size="sm">
          Add to Deck
        </Button>
      </Card.Body>
    </Card>
  );
}

export default PokemonCard;
