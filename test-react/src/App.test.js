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


const OtherComponent = () => {
  return (
    <div>
      <label htmlFor="search">Buscar</label>
      <input
        id="search"
        type="text"
        placeholder='Search placeholder'
        value='Javascript'
        onChange={f => f}
      />
    </div>
  )
}


describe('OtherComponent', () => {
  test('renders OtherComponent component', async () => {
    render(<OtherComponent />);

    // LabelText
    expect(screen.getByLabelText('Buscar')).toBeInTheDocument();
    // PlaceholderText
    expect(screen.getByPlaceholderText('Search placeholder')).toBeInTheDocument();
    // DisplayValuev
    expect(screen.getByDisplayValue('Javascript')).toBeInTheDocument();

  });
});