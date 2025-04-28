// Nuevo archivo limpio y funcional para CONFIRMAR el cambio de contraseña (después del enlace)

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function RestablecerContrasena() {
  const { uidb64, token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setError("");

    if (password !== confirmarPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      const response = await api.post(
        `/usuarios/restablecer/confirmar/${uidb64}/${token}/`,
        { nueva_password: password }
      );
      setMensaje(response.data.mensaje);
      setTimeout(() => navigate("/"), 3000); // Redirige al login en 3 segundos
    } catch (err) {
      const errorData = err.response?.data;
      if (errorData?.error) {
        setError(errorData.error);
      } else {
        setError("Ocurrió un error. Intenta nuevamente.");
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4 text-emerald-600">Restablecer Contraseña</h2>

      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded shadow">
        <div className="mb-4">
          <label className="block mb-1 font-medium">Nueva Contraseña</label>
          <input
            type="password"
            className="w-full border p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Confirmar Contraseña</label>
          <input
            type="password"
            className="w-full border p-2 rounded"
            value={confirmarPassword}
            onChange={(e) => setConfirmarPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="w-full bg-emerald-500 text-white py-2 rounded hover:bg-emerald-600">
          Restablecer
        </button>

        {mensaje && <p className="text-green-600 mt-4 text-center">{mensaje}</p>}
        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
      </form>
    </div>
  );
}
