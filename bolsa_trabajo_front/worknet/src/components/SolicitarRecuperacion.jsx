import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function RestablecerContrasena() {
  const { uid, token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setMensaje('');
    setError('');

    if (password !== confirmar) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:8000/api/usuarios/restablecer/`, {
        uid,
        token,
        nueva_contrasena: password
      });

      setMensaje('✅ Contraseña actualizada correctamente. Redirigiendo...');
      setTimeout(() => navigate('/'), 3000);
    } catch (err) {
      setError('❌ El enlace no es válido o ha expirado.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h2 className="text-2xl font-bold text-emerald-600 mb-4">Restablecer Contraseña</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <div>
          <label className="block font-medium mb-1">Nueva Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Confirmar Contraseña</label>
          <input
            type="password"
            value={confirmar}
            onChange={e => setConfirmar(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-emerald-500 text-white py-2 rounded hover:bg-emerald-600 transition"
        >
          Restablecer
        </button>
        {mensaje && <p className="text-green-600 text-center">{mensaje}</p>}
        {error && <p className="text-red-600 text-center">{error}</p>}
      </form>
    </div>
  );
}
