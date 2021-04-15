import React from 'react';
import { render, screen } from '@testing-library/react';
 
import App from './App';
 
describe('App', () => {
  test('renders App component', () => {
    render(<App />);

    // inplicita asercion
    // por que getByText puede mandar error
    // y el elemento no pobria estar
    // screen.getByText('Search:')

    // explicita asercion, titnenque ser identico con mayusculas
    expect(screen.getByText('Search:')).toBeInTheDocument();
  });
});