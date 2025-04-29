import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../components/Navbar';

describe('Navbar Component', () => {
  it('renderiza correctamente el logo y los links', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    // Verifica que aparezca el título
    expect(screen.getByText('WorkNet')).toBeInTheDocument();

    // Verifica los links
    expect(screen.getByRole('link', { name: /iniciar sesión/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /registro candidato/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /registro empresa/i })).toBeInTheDocument();
  });
});
