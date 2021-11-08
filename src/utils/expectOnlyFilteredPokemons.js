import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

const expectOnlyFilteredPokemons = ({ type, pokemons }) => {
  const filteredPokemons = pokemons.filter((pokemon) => pokemon.type === type);
  const pokemonNames = filteredPokemons.map((pokemon) => (pokemon).name);

  pokemonNames.forEach((pokemonName) => {
    expect(screen.getByText(pokemonName)).toBeInTheDocument();
    expect(screen.getByTestId('pokemon-type').innerHTML).toBe(type);
    userEvent.click(screen.getByRole('button', { name: 'Próximo pokémon' }));
  });
};

export default expectOnlyFilteredPokemons;
