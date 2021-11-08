import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import React from 'react';
import App from '../App';
import renderWithRouter from '../utils/renderWithRouter';

describe('Teste do App.js', () => {
  it('Texto correto dos links', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toBeInTheDocument();
    const aboutLink = screen.getByRole('link', { name: /about/i });
    expect(aboutLink).toBeInTheDocument();
    const favoriteLink = screen.getByRole('link', { name: /favorite pokémons/i });
    expect(favoriteLink).toBeInTheDocument();
  });
  it('Redirecionamento do Home', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toBeInTheDocument();

    userEvent.click(homeLink);
    expect(history.location.pathname).toBe('/');
  });
  it('Redirecionamento do About', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: /about/i });
    expect(aboutLink).toBeInTheDocument();

    userEvent.click(aboutLink);
    expect(history.location.pathname).toBe('/about');
  });
  it('Redirecionamento do Favorite Pokémons', () => {
    const { history } = renderWithRouter(<App />);
    const favotiteLink = screen.getByRole('link', { name: /favorite pokémons/i });
    expect(favotiteLink).toBeInTheDocument();

    userEvent.click(favotiteLink);
    expect(history.location.pathname).toBe('/favorites');
  });
});
