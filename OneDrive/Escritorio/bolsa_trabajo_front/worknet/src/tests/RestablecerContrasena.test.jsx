import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RestablecerContrasena from '../components/RestablecerContrasena';
import '@testing-library/jest-dom';

// Mock de useParams y useNavigate
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: () => ({
      uidb64: 'mockUid',
      token: 'mockToken',
    }),
    useNavigate: () => vi.fn(),
  };
});

// Mock del servicio API
vi.mock('../services/api', () => ({
  default: {
    post: vi.fn(() => Promise.resolve({ data: { mensaje: 'Contraseña cambiada exitosamente' } })),
  }
}));

describe('RestablecerContrasena Component', () => {
  it('renderiza correctamente los campos', () => {
    render(
      <MemoryRouter>
        <RestablecerContrasena />
      </MemoryRouter>
    );

    const passwordInputs = document.querySelectorAll('input[type="password"]');
    expect(passwordInputs.length).toBe(2);

    expect(screen.getByRole('button', { name: /restablecer/i })).toBeInTheDocument();
  });

  it('permite llenar el formulario y enviarlo', async () => {
    render(
      <MemoryRouter>
        <RestablecerContrasena />
      </MemoryRouter>
    );

    const passwordInputs = document.querySelectorAll('input[type="password"]');

    fireEvent.change(passwordInputs[0], { target: { value: 'NuevaClave123' } });
    fireEvent.change(passwordInputs[1], { target: { value: 'NuevaClave123' } });

    const boton = screen.getByRole('button', { name: /restablecer/i });
    fireEvent.click(boton);

    expect(boton).toBeInTheDocument();
  });
});
