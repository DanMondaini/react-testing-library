import React from 'react';
import { render, screen } from '@testing-library/react';
import { FavoritePokemons } from '../components';

describe('Testa o componente <FavoritePokemons.js />', () => {
  it('Exibe mensagem quando não há pokemons favoritos', () => {
    render(<FavoritePokemons />);
    const pokemonNotFoundMessage = screen.getByText('No favorite pokemon found');
    expect(pokemonNotFoundMessage).toBeInTheDocument();
  });
});
