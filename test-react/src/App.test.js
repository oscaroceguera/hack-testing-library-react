import React from 'react';
import { render, screen , fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
 
import App, { Search } from './App';

 
describe('App', () => {
  test('renders App component', async () => {
    render(<App />);
 
    // wait for the user to resolve
    await screen.findByText(/Signed in as/);

    expect(screen.queryByText(/Searches for JavaScript/)).toBeNull();
 
    await userEvent.type(screen.getByRole('textbox'), 'JavaScript');
 
    expect(
      screen.getByText(/Searches for JavaScript/)
    ).toBeInTheDocument();
  });
});

describe('Search', () => {
  test('calls the onChange callback handler', () => {
    // jest.fn(): Simula una funcion para ver si esta fue llamada
    const onChange = jest.fn();
 
    render(
      <Search value="" onChange={onChange}>
        Search:
      </Search>
    );

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'JavaScript' },
    });
    // fireEvent.change(screen.getByRole('textbox'), {
    //   target: { value: 'JavaScript' },
    // });
 
    // fireEvent ejecuta la funcion change event solo una vez, userevent lo activa cada pulsacion de tecla
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  test('calls the onChange callback handler with userEvent', async () => {
    const onChange = jest.fn();
 
    render(
      <Search value="" onChange={onChange}>
        Search:
      </Search>
    );

    await userEvent.type(screen.getByRole('textbox'), 'JavaScript')

    // aqui vemos que userEvent coincide con el comportamiento del usuario
    // cada pulsacion de tecla
    // por que cada vvez que se escribe algo en el input se usa la funcion onChange que son 10
    expect(onChange).toHaveBeenCalledTimes(10);
  });
});