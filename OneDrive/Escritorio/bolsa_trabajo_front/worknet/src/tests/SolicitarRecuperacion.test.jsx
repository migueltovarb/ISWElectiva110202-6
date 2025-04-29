// src/tests/SolicitarRecuperacion.test.jsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SolicitarRecuperacion from '../components/SolicitarRecuperacion';
import axios from 'axios';

vi.mock('axios');

describe('SolicitarRecuperacion Component', () => {
  it('renderiza correctamente los campos', () => {
    render(
      <BrowserRouter>
        <SolicitarRecuperacion />
      </BrowserRouter>
    );

    const inputs = document.querySelectorAll('input[type="password"]');
    expect(inputs.length).toBe(2); // Deben ser 2 campos de contraseña
    expect(screen.getByRole('button', { name: /restablecer/i })).toBeInTheDocument();
  });

  it('permite llenar el formulario y enviarlo exitosamente', async () => {
    axios.post.mockResolvedValueOnce({ data: { mensaje: '✅ Contraseña actualizada correctamente. Redirigiendo...' } });

    render(
      <BrowserRouter>
        <SolicitarRecuperacion />
      </BrowserRouter>
    );

    const inputs = document.querySelectorAll('input[type="password"]');
    fireEvent.change(inputs[0], { target: { value: 'NuevaContrasena123' } });
    fireEvent.change(inputs[1], { target: { value: 'NuevaContrasena123' } });

    fireEvent.click(screen.getByRole('button', { name: /restablecer/i }));

    await waitFor(() => {
      expect(screen.getByText(/contraseña actualizada correctamente/i)).toBeInTheDocument();
    });
  });

  it('muestra error si las contraseñas no coinciden', async () => {
    render(
      <BrowserRouter>
        <SolicitarRecuperacion />
      </BrowserRouter>
    );

    const inputs = document.querySelectorAll('input[type="password"]');
    fireEvent.change(inputs[0], { target: { value: 'password1' } });
    fireEvent.change(inputs[1], { target: { value: 'password2' } });

    fireEvent.click(screen.getByRole('button', { name: /restablecer/i }));

    await waitFor(() => {
      expect(screen.getByText(/las contraseñas no coinciden/i)).toBeInTheDocument();
    });
  });
});
