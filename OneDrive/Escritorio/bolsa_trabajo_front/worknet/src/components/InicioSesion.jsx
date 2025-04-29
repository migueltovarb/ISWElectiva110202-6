import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

function InicioSesion() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMensaje('');
    setError('');

    try {
      const response = await api.post('usuarios/login/', formData);

      // ✅ Guardar token y tipo de usuario en localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('tipo_usuario', response.data.tipo_usuario);

      setMensaje(response.data.mensaje + ' (' + response.data.tipo_usuario + ')');

      // ✅ Redirigir automáticamente al perfil correspondiente
      if (response.data.tipo_usuario === 'empresa') {
        navigate('/perfil-empresa');
      } else if (response.data.tipo_usuario === 'candidato') {
        navigate('/perfil-candidato');
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.non_field_errors?.[0] || 'Error al iniciar sesión');
      } else {
        setError('Error del servidor');
      }
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Panel izquierdo - bienvenida */}
      <div className="w-1/2 bg-emerald-500 text-white flex flex-col justify-center items-center p-10">
        <h2 className="text-4xl font-bold mb-4">¡Bienvenido!</h2>
        <p className="text-center mb-6">
          Ingrese sus datos personales para usar todas las funciones del sitio
        </p>
        <button
          onClick={() => navigate('/seleccionar-cuenta')}
          className="border border-white px-6 py-2 rounded hover:bg-white hover:text-emerald-500 transition"
        >
          Registrarse
        </button>
      </div>

      {/* Panel derecho - formulario */}
      <div className="w-1/2 bg-white flex flex-col justify-center items-center p-10">
        <h2 className="text-3xl font-bold mb-6">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <div className="mb-4">
            <label className="block font-semibold mb-1">Email</label>
            <input
              type="email"
              name="email"
              className="w-full border rounded px-4 py-2"
              placeholder="ejemplo@correo.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-2">
            <label className="block font-semibold mb-1">Contraseña</label>
            <input
              type="password"
              name="password"
              className="w-full border rounded px-4 py-2"
              placeholder="••••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Enlace funcional con redirección */}
          <div className="text-right text-sm mb-4">
            <Link to="/recuperar" className="text-emerald-500 hover:underline">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-500 text-white py-2 rounded hover:bg-emerald-600 transition"
          >
            INICIAR SESIÓN
          </button>

          {mensaje && <p className="text-green-600 mt-4 text-center">{mensaje}</p>}
          {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default InicioSesion;
