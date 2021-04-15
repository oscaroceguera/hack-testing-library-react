import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});


describe("true is truthy and false is falsy", () => {
  test("true is truthy", () => {
    expect(true).toBe(true);
  });

  test("false is falsy", () => {
    expect(false).toBe(false);
  });
});

function sum(x, y) {
  return x + y;
}

describe("sum", () => {
  test("sums up two values", () => {
    expect(sum(2, 4)).toBe(6);
  });
});