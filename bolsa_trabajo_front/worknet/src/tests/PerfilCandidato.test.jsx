import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PerfilCandidato from '../components/PerfilCandidato';
import '@testing-library/jest-dom';

describe('PerfilCandidato Component', () => {
  it('renderiza todos los campos del formulario correctamente', async () => {
    await waitFor(() => {
      render(<PerfilCandidato />);
    });

    expect(screen.getByText(/perfil de candidato/i)).toBeInTheDocument();
    expect(screen.getByText(/subir foto/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/descripción/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/educación/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/experiencia/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/habilidades/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /guardar perfil/i })).toBeInTheDocument();
  });

  it('permite llenar el formulario y hacer submit', async () => {
    await waitFor(() => {
      render(<PerfilCandidato />);
    });

    fireEvent.change(screen.getByLabelText(/descripción/i), {
      target: { value: 'Soy un candidato motivado' }
    });

    fireEvent.change(screen.getByLabelText(/educación/i), {
      target: { value: 'Ingeniería en Sistemas' }
    });

    fireEvent.change(screen.getByLabelText(/experiencia/i), {
      target: { value: '2 años en desarrollo web' }
    });

    fireEvent.change(screen.getByLabelText(/habilidades/i), {
      target: { value: 'React, Node.js, SQL' }
    });

    const boton = screen.getByRole('button', { name: /guardar perfil/i });
    fireEvent.click(boton);

    expect(boton).toBeInTheDocument(); // Verifica que el botón sigue visible después de hacer submit
  });
});
