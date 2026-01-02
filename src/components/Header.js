import { Navbar, Container } from "react-bootstrap";

function Header() {
  return (
    <Navbar bg="dark" variant="dark" className="mb-4 rounded">
      <Container>
        <Navbar.Brand>Pokeverse | All Pokémon</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default Header;
