import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import InicioSesion from '../components/InicioSesion';
import '@testing-library/jest-dom'; // ✅ importar matchers

// Mock de navigate para simular la navegación
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
    post: vi.fn(() => Promise.resolve({ data: { mensaje: 'Inicio de sesión exitoso', tipo_usuario: 'candidato' } })),
  }
}));

describe('InicioSesion Component', () => {
  it('renderiza los campos correctamente', () => {
    render(
      <BrowserRouter>
        <InicioSesion />
      </BrowserRouter>
    );

    expect(screen.getByPlaceholderText('ejemplo@correo.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('••••••••••')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /iniciar sesión/i })).toBeInTheDocument();
  });

  it('permite llenar el formulario e intentar enviar', async () => {
    render(
      <BrowserRouter>
        <InicioSesion />
      </BrowserRouter>
    );

    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText('ejemplo@correo.com'), {
        target: { value: 'usuario@correo.com' },
      });

      fireEvent.change(screen.getByPlaceholderText('••••••••••'), {
        target: { value: 'contraseña123' },
      });

      const boton = screen.getByRole('button', { name: /iniciar sesión/i });
      fireEvent.click(boton);
    });

    // ✅ Este expect sigue bien
    const boton = screen.getByRole('button', { name: /iniciar sesión/i });
    expect(boton).toBeInTheDocument();
  });
});
