import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders mainpage title', () => {
  render(<App />);
  const linkElement = screen.getByText(/Mapping Pro/i);
  expect(linkElement).toBeInTheDocument();
});
