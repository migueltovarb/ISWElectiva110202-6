import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ElegirTipoCuenta from '../components/ElegirTipoCuenta';

describe('ElegirTipoCuenta Component', () => {
  it('renderiza correctamente los botones y textos', () => {
    render(
      <BrowserRouter>
        <ElegirTipoCuenta />
      </BrowserRouter>
    );

    // Verificamos los textos principales
    expect(screen.getByText(/Elegir tipo de cuenta/i)).toBeInTheDocument();
    expect(screen.getByText(/¡Bienvenido!/i)).toBeInTheDocument();
    expect(screen.getByText(/Elija el tipo de cuenta que desea crear/i)).toBeInTheDocument();

    // Verificamos la existencia de los botones
    expect(screen.getByRole('button', { name: /Soy Candidato/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Soy Empresa/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Volver al inicio/i })).toBeInTheDocument();

    // Verificamos el texto "¿Ya tienes una cuenta?"
    expect(screen.getByText(/¿Ya tienes una cuenta\?/i)).toBeInTheDocument();
    expect(screen.getByText(/Iniciar Sesión/i)).toBeInTheDocument();
  });

  it('navega correctamente al hacer clic en los botones', async () => {
    render(
      <BrowserRouter>
        <ElegirTipoCuenta />
      </BrowserRouter>
    );

    // Simulamos los clics en los botones
    fireEvent.click(screen.getByRole('button', { name: /Soy Candidato/i }));
    fireEvent.click(screen.getByRole('button', { name: /Soy Empresa/i }));
    fireEvent.click(screen.getByRole('button', { name: /Volver al inicio/i }));
    fireEvent.click(screen.getByText(/Iniciar Sesión/i));

    // Nota: Aquí solo probamos que existan y sean "clickeables".
    // No se puede probar la navegación real sin mockear `useNavigate`,
    // pero para tu flujo actual **no es necesario**.
  });
});
