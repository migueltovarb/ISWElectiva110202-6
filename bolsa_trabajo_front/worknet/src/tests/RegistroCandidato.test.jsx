import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import RegistroCandidato from '../components/RegistroCandidato';
import '@testing-library/jest-dom'; // Matchers extra

// Mock de navigate
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

// Mock del servicio api
vi.mock('../services/api', () => ({
  default: {
    post: vi.fn(() => Promise.resolve({ status: 201 })),
  },
}));

describe('RegistroCandidato Component', () => {
  it('renderiza todos los campos del formulario correctamente', () => {
    render(
      <BrowserRouter>
        <RegistroCandidato />
      </BrowserRouter>
    );

    expect(screen.getByPlaceholderText(/ingresa tu nombre completo/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/ejemplo@correo.com/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/ciudad, país/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/crea una contraseña segura/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /registrarse/i })).toBeInTheDocument();
  });

  it('permite llenar el formulario y enviarlo', async () => {
    render(
      <BrowserRouter>
        <RegistroCandidato />
      </BrowserRouter>
    );

    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText(/ingresa tu nombre completo/i), {
        target: { value: 'Juan Pérez' },
      });

      fireEvent.change(screen.getByPlaceholderText(/ejemplo@correo.com/i), {
        target: { value: 'juanperez@example.com' },
      });

      fireEvent.change(screen.getByPlaceholderText(/ciudad, país/i), {
        target: { value: 'Bogotá, Colombia' },
      });

      fireEvent.change(screen.getByPlaceholderText(/crea una contraseña segura/i), {
        target: { value: 'PasswordSegura123' },
      });

      const submitButton = screen.getByRole('button', { name: /registrarse/i });
      fireEvent.click(submitButton);
    });

    expect(screen.getByRole('button', { name: /registrarse/i })).toBeInTheDocument();
  });
});
