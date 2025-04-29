// src/tests/EnviarRecuperacionCorreo.test.jsx
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import EnviarRecuperacionCorreo from '../components/EnviarRecuperacionCorreo';
import api from '../services/api';

vi.mock('../services/api');

describe('EnviarRecuperacionCorreo Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renderiza correctamente el formulario', () => {
    render(
      <BrowserRouter>
        <EnviarRecuperacionCorreo />
      </BrowserRouter>
    );

    expect(screen.getByText(/recuperación de contraseña/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/ingresa tu correo/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /enviar enlace/i })).toBeInTheDocument();
  });

  it('muestra mensaje de éxito al enviar el correo correctamente', async () => {
    api.post.mockResolvedValue({ data: { mensaje: 'Correo enviado con éxito' } });

    render(
      <BrowserRouter>
        <EnviarRecuperacionCorreo />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/ingresa tu correo/i), {
      target: { value: 'test@correo.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: /enviar enlace/i }));

    await waitFor(() => {
      expect(screen.getByText(/correo enviado con éxito/i)).toBeInTheDocument();
    });
  });

  it('muestra mensaje de error si falla el envío', async () => {
    api.post.mockRejectedValue({});

    render(
      <BrowserRouter>
        <EnviarRecuperacionCorreo />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/ingresa tu correo/i), {
      target: { value: 'test@correo.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: /enviar enlace/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/no se pudo enviar el correo/i)
      ).toBeInTheDocument();
    });
  });
});
