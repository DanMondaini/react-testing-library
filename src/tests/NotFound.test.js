import { screen } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from '../utils/renderWithRouter';

describe('Testa NotFound.js', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<App />);
    history.push('/caminhoquenaoexiste');
  });
  it('Contém h2 com o texto "Page requested not found 😭"', () => {
    const h2El = screen.getByRole('heading', { name: /Page requested not found/i });
    const spanEl = screen.getByText(/😭/i);

    expect(h2El).toBeInTheDocument();
    expect(spanEl).toBeInTheDocument();
  });

  it('Contém imagem com src "https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif"', () => {
    const imgAltText = 'Pikachu crying because the page requested was not found';
    const imgEl = screen.getByAltText(imgAltText);

    expect(imgEl).toBeInTheDocument();
    expect(imgEl).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
