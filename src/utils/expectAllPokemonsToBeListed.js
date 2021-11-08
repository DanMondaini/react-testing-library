import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const expectAllPokemonsToBeListed = (pokemons) => {
  pokemons.forEach(({ name }) => {
    const nextButton = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(screen.getByText(name)).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
    userEvent.click(nextButton);
  });
};

export default expectAllPokemonsToBeListed;
