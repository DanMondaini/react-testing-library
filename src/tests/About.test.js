import { screen } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from '../utils/renderWithRouter';

describe('Testa o About', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');
  });

  it('Página contém heading com o texto "About Pokédex"', () => {
    const h2El = screen.getByRole('heading', { name: 'About Pokédex', level: 2 });
    expect(h2El).toBeInTheDocument();
  });

  it('Contém parágrafos com texto sobre a pokedex', () => {
    const firstParagraphText = /This application simulates a Pokédex,/i;
    const secondParagraphText = /One can filter Pokémons by type,/i;
    const firstParagraphElement = screen.getByText(firstParagraphText);
    const secondParagraphElement = screen.getByText(secondParagraphText);

    expect(firstParagraphElement).toBeInTheDocument();
    expect(secondParagraphElement).toBeInTheDocument();
  });

  it('Contém imagem com src "https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png".', () => {
    const imgEl = screen.getByAltText('Pokédex');
    expect(imgEl).toBeInTheDocument();
    expect(imgEl.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
