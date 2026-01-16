import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "./pages/Home"; // ✅ test Pokeverse UI directly
jest.mock("./services/pokeApi", () => ({
  fetchPokemon: jest.fn(),
}));

import { fetchPokemon } from "./services/pokeApi";

const makePokemon = (id, name) => ({
  id,
  name,
  url: `https://pokeapi.co/api/v2/pokemon/${id}/`,
});

describe("Pokeverse App (Home screen)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    fetchPokemon.mockResolvedValue([
      makePokemon(1, "bulbasaur"),
      makePokemon(4, "charmander"),
      makePokemon(7, "squirtle"),
      makePokemon(25, "pikachu"),
      makePokemon(39, "jigglypuff"),
      makePokemon(52, "meowth"),
      makePokemon(133, "eevee"),
    ]);
  });

  test("renders header and disables Battle until at least 2 pokemon are in squad", async () => {
    render(<Home />);

    await screen.findByText(/all pokémon/i);

    const battleButton = screen.getByRole("button", { name: /battle/i });
    expect(battleButton).toBeDisabled();

    await userEvent.click(screen.getAllByRole("button", { name: /^add$/i })[0]);
    expect(battleButton).toBeDisabled();

    await userEvent.click(screen.getAllByRole("button", { name: /^add$/i })[0]);
    expect(battleButton).toBeEnabled();
  });

  test("adds a pokemon to My squad and removes it", async () => {
    render(<Home />);

    await screen.findByText(/all pokémon/i);
    expect(screen.getByText(/my squad \(0\)/i)).toBeInTheDocument();

    await userEvent.click(screen.getAllByRole("button", { name: /^add$/i })[0]);
    expect(screen.getByText(/my squad \(1\)/i)).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: /remove/i }));
    expect(screen.getByText(/my squad \(0\)/i)).toBeInTheDocument();
  });

  test("prevents duplicate pokemon in squad (button becomes Added/disabled)", async () => {
    render(<Home />);

    await screen.findByText(/all pokémon/i);

    await userEvent.click(screen.getAllByRole("button", { name: /^add$/i })[0]);

    const addedButton = await screen.findByRole("button", { name: /added/i });
    expect(addedButton).toBeDisabled();

    expect(screen.getByText(/my squad \(1\)/i)).toBeInTheDocument();
  });

  test("enforces max squad size of 6 (remaining Add buttons disabled)", async () => {
    render(<Home />);

    await screen.findByText(/all pokémon/i);

    for (let i = 0; i < 6; i++) {
      const addButtons = screen.getAllByRole("button", { name: /^add$/i });
      const nextEnabled = addButtons.find((b) => !b.disabled);
      expect(nextEnabled).toBeTruthy();
      await userEvent.click(nextEnabled);
    }

    expect(screen.getByText(/my squad \(6\)/i)).toBeInTheDocument();

    const remainingAddButtons = screen.getAllByRole("button", { name: /^add$/i });
    remainingAddButtons.forEach((btn) => expect(btn).toBeDisabled());
  });

  test("filters pokemon list by search", async () => {
    render(<Home />);

    await screen.findByText(/all pokémon/i);

    const search = screen.getByLabelText(/search pokémon/i);
    await userEvent.type(search, "eev");

    expect(screen.getByText(/eevee/i)).toBeInTheDocument();
    expect(screen.queryByText(/pikachu/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/bulbasaur/i)).not.toBeInTheDocument();
  });

  test("Battle button stays disabled when only 1 pokemon is in squad", async () => {
    render(<Home />);

    await screen.findByText(/all pokémon/i);

    const battleButton = screen.getByRole("button", { name: /battle/i });
    expect(battleButton).toBeDisabled();

    await userEvent.click(screen.getAllByRole("button", { name: /^add$/i })[0]);
    expect(battleButton).toBeDisabled();
  });

  test("clicking Add changes that pokemon button to Added and disables it", async () => {
    render(<Home />);

    await screen.findByText(/all pokémon/i);

    const addButtons = screen.getAllByRole("button", { name: /^add$/i });
    await userEvent.click(addButtons[0]);
    const addedButton = await screen.findByRole("button", { name: /added/i });
    expect(addedButton).toBeDisabled();
  });

  test("search with no matches shows no pokemon names (basic empty results behavior)", async () => {
    render(<Home />);

    await screen.findByText(/all pokémon/i);

    const search = screen.getByLabelText(/search pokémon/i);
    await userEvent.type(search, "zzzz-not-a-pokemon");

    expect(screen.queryByText(/bulbasaur/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/pikachu/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/eevee/i)).not.toBeInTheDocument();
  });

  test("when squad reaches 6, all remaining Add buttons are disabled", async () => {
    render(<Home />);

    await screen.findByText(/all pokémon/i);

    for (let i = 0; i < 6; i++) {
      const addButtons = screen.getAllByRole("button", { name: /^add$/i });
      const nextEnabled = addButtons.find((b) => !b.disabled);
      await userEvent.click(nextEnabled);
    }

    expect(screen.getByText(/my squad \(6\)/i)).toBeInTheDocument();
    screen.getAllByRole("button", { name: /^add$/i }).forEach((btn) => {
      expect(btn).toBeDisabled();
    });
  });

});

