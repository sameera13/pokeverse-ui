import { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import PokemonGrid from "../components/PokemonGrid";
import { fetchPokemon } from "../services/pokeApi";

function Home() {
  const [pokemon, setPokemon] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPokemon().then((data) => {
      setPokemon(data);
      setLoading(false);
    });
  }, []);

  const filteredPokemon = pokemon.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container className="my-4">
      <Header />
      <SearchBar value={search} onChange={setSearch} />
      {loading ? (
        <div className="d-flex justify-content-center mt-5">
          <Spinner animation="border" />
        </div>
      ) : (
        <PokemonGrid pokemon={filteredPokemon} />
      )}
    </Container>
  );
}

export default Home;
