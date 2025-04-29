import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import '@testing-library/jest-dom';
import PerfilEmpresa from '../components/PerfilEmpresa'; // ✅ Bien importado

describe("PerfilEmpresa Component", () => {
  it("renderiza correctamente todos los campos del formulario", () => {
    render(<PerfilEmpresa />);

    expect(screen.getByLabelText(/descripción/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/correo de contacto/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/teléfono/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/dirección/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/sector de la empresa/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/tamaño de la empresa/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/sitio web/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /guardar perfil/i })).toBeInTheDocument();
  });

  it("permite llenar el formulario correctamente", () => {
    render(<PerfilEmpresa />);

    fireEvent.change(screen.getByLabelText(/descripción/i), {
      target: { value: "Empresa líder en innovación" }
    });
    fireEvent.change(screen.getByLabelText(/correo de contacto/i), {
      target: { value: "empresa@correo.com" }
    });
    fireEvent.change(screen.getByLabelText(/teléfono/i), {
      target: { value: "123456789" }
    });
    fireEvent.change(screen.getByLabelText(/dirección/i), {
      target: { value: "Calle Falsa 123" }
    });
    fireEvent.change(screen.getByLabelText(/sector de la empresa/i), {
      target: { value: "Tecnología" }
    });
    fireEvent.change(screen.getByLabelText(/tamaño de la empresa/i), {
      target: { value: "Grande" }
    });
    fireEvent.change(screen.getByLabelText(/sitio web/i), {
      target: { value: "https://empresa.com" }
    });

    fireEvent.click(screen.getByRole('button', { name: /guardar perfil/i }));

    expect(screen.getByLabelText(/descripción/i)).toHaveValue('Empresa líder en innovación');
    expect(screen.getByLabelText(/correo de contacto/i)).toHaveValue('empresa@correo.com');
    expect(screen.getByLabelText(/teléfono/i)).toHaveValue('123456789');
    expect(screen.getByLabelText(/dirección/i)).toHaveValue('Calle Falsa 123');
    expect(screen.getByLabelText(/sector de la empresa/i)).toHaveValue('Tecnología');
    expect(screen.getByLabelText(/tamaño de la empresa/i)).toHaveValue('Grande');
    expect(screen.getByLabelText(/sitio web/i)).toHaveValue('https://empresa.com');
  });
});
