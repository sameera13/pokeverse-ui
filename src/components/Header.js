import { Button, Container, Navbar } from "react-bootstrap";

function Header({ battleEnabled }) {
  return (
    <Navbar bg="dark" variant="dark" className="mb-4 rounded">
      <Container className="d-flex justify-content-between">
        <Navbar.Brand className="fw-bold">Pokeverse</Navbar.Brand>

        <Button
          variant="danger"
          disabled={!battleEnabled}
          aria-disabled={!battleEnabled}
        >
          Battle
        </Button>
      </Container>
    </Navbar>
  );
}

export default Header;
