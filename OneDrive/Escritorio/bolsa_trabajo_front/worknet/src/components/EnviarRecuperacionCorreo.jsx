import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function EnviarRecuperacionCorreo() {
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setError("");

    try {
      const response = await api.post("/usuarios/recuperar/", { email });
      setMensaje(response.data.mensaje);
    } catch (err) {
      setError("No se pudo enviar el correo. Intenta nuevamente.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-emerald-500 px-4">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-emerald-600 mb-4">Recuperación de Contraseña</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 text-left">
            <label className="block text-sm font-semibold mb-1">Correo Electrónico</label>
            <input
              type="email"
              placeholder="Ingresa tu correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-emerald-500 text-white py-2 rounded hover:bg-emerald-600"
          >
            Enviar enlace
          </button>
        </form>

        {mensaje && <p className="text-green-600 mt-4">{mensaje}</p>}
        {error && <p className="text-red-600 mt-4">{error}</p>}

        <p className="mt-6 text-sm">
          <button
            onClick={() => navigate("/")}
            className="text-emerald-600 hover:underline"
          >
            Volver al inicio de sesión
          </button>
        </p>
      </div>
    </div>
  );
}
