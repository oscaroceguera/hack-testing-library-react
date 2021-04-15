import React from 'react';
import { render, screen } from '@testing-library/react';
 
import App from './App';

describe('App', () => {
  test('renders App component', async () => {
    render(<App />);
    
    // primero sin findByText
    expect(screen.queryByText(/Signed in as/)).toBeNull();
    // activar al ultimo
    screen.debug()
    expect(await screen.findByText(/Signed in as/)).toBeInTheDocument();
    // activar al ultimo
    screen.debug()
  });
});