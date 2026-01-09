import { useEffect, useMemo, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import PokemonGrid from "../components/PokemonGrid";
import SquadRow from "../components/SquadRow";
import { fetchPokemon } from "../services/pokeApi";

const MAX_SQUAD = 6;

function Home() {
  const [pokemon, setPokemon] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Squad state (store pokemon objects)
  const [squad, setSquad] = useState([]);

  useEffect(() => {
    fetchPokemon().then((data) => {
      setPokemon(data);
      setLoading(false);
    });
  }, []);

  // Add to squad: max 6, no duplicates
  const addToSquad = (poke) => {
    setSquad((prev) => {
      if (prev.length >= MAX_SQUAD) return prev;
      if (prev.some((p) => p.id === poke.id)) return prev; // no duplicates
      return [...prev, poke];
    });
  };

  // Remove from squad
  const removeFromSquad = (pokeId) => {
    setSquad((prev) => prev.filter((p) => p.id !== pokeId));
  };

  const filteredPokemon = useMemo(() => {
    return pokemon.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [pokemon, search]);

  const battleEnabled = squad.length >= 2;

  return (
    <Container className="my-4" style={{ maxWidth: 980 }}>
      <Header battleEnabled={battleEnabled} />

      {loading ? (
        <div className="d-flex justify-content-center mt-5">
          <Spinner animation="border" />
        </div>
      ) : (
        <>
          <SquadRow squad={squad} onRemove={removeFromSquad} />

          <div className="d-flex align-items-center justify-content-between mt-4">
            <h3 className="m-0">All Pokémon</h3>
            <SearchBar value={search} onChange={setSearch} />
          </div>

          <PokemonGrid
            pokemon={filteredPokemon}
            squad={squad}
            onAdd={addToSquad}
            maxSquad={MAX_SQUAD}
          />
        </>
      )}
    </Container>
  );
}

export default Home;
