/** @jest-environment jsdom */
import React from 'react';
import { render, screen } from '@testing-library/react';
import Hero from '../../frontend/src/components/Hero.jsx';

describe('Hero component', () => {
  it('renders heading', () => {
    render(<Hero />);
    expect(screen.getByText(/Find Your Dream Job Today/i)).toBeInTheDocument();
  });
});
