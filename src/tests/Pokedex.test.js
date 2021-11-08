import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../utils/renderWithRouter';
import pokemons from '../data';
import expectOnlyFilteredPokemons from '../utils/expectOnlyFilteredPokemons';
import expectAllPokemonsToBeListed from '../utils/expectAllPokemonsToBeListed';

describe('Testa Pokedex', () => {
  const NEXT_BUTTON_NAME = 'Próximo pokémon';
  beforeEach(() => {
    renderWithRouter(<App />);
  });
  it('h2 com texto "Encountered pokémons"', () => {
    const h2El = screen.getByRole('heading', { name: 'Encountered pokémons' });
    expect(h2El).toBeInTheDocument();
  });

  it('Exibe próximo pokemon da lista ao clicar no botão "Próximo pokémon"', () => {
    userEvent.click(screen.getByRole('button', { name: NEXT_BUTTON_NAME }));
    expect(screen.getByText('Charmander')).toBeInTheDocument();
  });

  it('Exibe somente um pokemon ao clicar no botão "Próximo pokémon"', () => {
    expect(screen.getByText('Pikachu')).toBeInTheDocument();

    userEvent.click(screen.getByRole('button', { name: NEXT_BUTTON_NAME }));
    expect(screen.getByText('Charmander')).toBeInTheDocument();

    const pikachuEl = screen.queryByText('Pikachu');
    expect(pikachuEl).not.toBeInTheDocument();

    userEvent.click(screen.getByRole('button', { name: NEXT_BUTTON_NAME }));
    expect(screen.getByText('Caterpie')).toBeInTheDocument();

    const charmanderEl = screen.queryByText('Charmander');
    expect(charmanderEl).not.toBeInTheDocument();
  });

  it('Clicando no próximo no final da lista deve mostrar o primeiro pokemon', () => {
    pokemons.forEach(() => {
      userEvent.click(screen.getByRole('button', { name: NEXT_BUTTON_NAME }));
    });
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
  });

  it('Tem botões para cada tipo de pokemon e um para zerar os filtros', () => {
    const filterButtonsNames = ['All', 'Electric', 'Fire', 'Bug',
      'Poison', 'Psychic', 'Normal', 'Dragon'];
    filterButtonsNames.forEach((buttonName) => {
      const filterButton = screen.getByRole('button', { name: buttonName });
      expect(filterButton).toBeInTheDocument();
      expect(filterButton.innerHTML).toContain(buttonName);
    });
  });

  it('Tem 7 botões de filtragem na tela', () => {
    const buttonsQuantity = 7;
    const allFilterButtons = screen.getAllByTestId('pokemon-type-button');
    expect(allFilterButtons).toHaveLength(buttonsQuantity);
  });

  it('Ao selecionar um filtro aparecem somente pokemons do tipo selecionado', () => {
    const filterButtonsNames = ['Electric', 'Fire', 'Bug',
      'Poison', 'Psychic', 'Normal', 'Dragon'];
    filterButtonsNames.forEach((buttonName) => {
      const filterButton = screen.getByRole('button', { name: buttonName });
      expect(filterButton).toBeInTheDocument();

      userEvent.click(filterButton);

      expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
      expectOnlyFilteredPokemons({ type: buttonName, pokemons });
    });
  });

  it('Botao existe e está selecionado mostrando todos os pokemons', () => {
    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
    expectAllPokemonsToBeListed(pokemons);

    userEvent.click(screen.getByRole('button', { name: 'Fire' }));
    userEvent.click(screen.getByRole('button', { name: 'All' }));

    expectAllPokemonsToBeListed(pokemons);
  });
});

// consultei o repositório do Erickson para realizar esse requisito - link: https://github.com/tryber/sd-015-b-project-react-testing-library/pull/40/commits/278b2842f439fd9803d8e0962a5d16d40845eb9b
