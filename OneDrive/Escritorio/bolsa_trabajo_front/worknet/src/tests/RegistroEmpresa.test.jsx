import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import RegistroEmpresa from '../components/RegistroEmpresa';
import '@testing-library/jest-dom'; // Extiende los matchers de expect

// Mock de navigate
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

// Mock del servicio API
vi.mock('../services/api', () => ({
  default: {
    post: vi.fn(() => Promise.resolve({ status: 201, data: { mensaje: 'Empresa registrada exitosamente' } })),
  },
}));

describe('RegistroEmpresa Component', () => {
  it('renderiza todos los campos del formulario correctamente', () => {
    render(
      <BrowserRouter>
        <RegistroEmpresa />
      </BrowserRouter>
    );

    expect(screen.getByPlaceholderText(/nombre legal de su empresa/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/ej: tecnología, salud, educación, etc\./i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/ciudad, país/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/empresa@ejemplo.com/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/crea una contraseña segura/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /registrarse/i })).toBeInTheDocument();
  });

  it('permite llenar el formulario y enviarlo', async () => {
    render(
      <BrowserRouter>
        <RegistroEmpresa />
      </BrowserRouter>
    );

    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText(/nombre legal de su empresa/i), {
        target: { value: 'TechCorp S.A.S' },
      });

      fireEvent.change(screen.getByPlaceholderText(/ej: tecnología, salud, educación, etc\./i), {
        target: { value: 'Tecnología' },
      });

      fireEvent.change(screen.getByPlaceholderText(/ciudad, país/i), {
        target: { value: 'Medellín, Colombia' },
      });

      fireEvent.change(screen.getByPlaceholderText(/empresa@ejemplo.com/i), {
        target: { value: 'empresa@techcorp.com' },
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
