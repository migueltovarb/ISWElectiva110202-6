import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 🧭 Importar el hook de navegación
import api from '../services/api';

export default function RegistroCandidato() {
  const navigate = useNavigate(); // 🧭 Inicializar navegación

  const [form, setForm] = useState({
    nombre_completo: '',
    email: '',
    ubicacion: '',
    password: ''
  });

  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');
    setError('');
    try {
      const response = await api.post('usuarios/registro-candidato/', form);
      if (response.status === 201) {
        setMensaje('Registro exitoso');
        setForm({
          nombre_completo: '',
          email: '',
          ubicacion: '',
          password: ''
        });
      } else {
        setError('Error inesperado');
      }
    } catch (err) {
      if (err.response && err.response.data) {
        const data = err.response.data;
        if (data.password) {
          setError('La contraseña es muy débil. Intenta con una más segura.');
        } else if (data.email) {
          setError('Ya existe un usuario con este correo.');
        } else {
          setError('Verifica los datos ingresados.');
        }
      } else {
        setError('Error al conectar con el servidor');
      }
    }
  };

  return (
    <div className="flex h-screen">
      {/* Lado izquierdo */}
      <div className="w-1/2 bg-emerald-500 text-white flex flex-col justify-center items-center p-8">
        <h2 className="text-4xl font-bold mb-4">¡Hola!</h2>
        <p className="text-lg text-center">
          Regístrese con sus datos personales para acceder a todas las oportunidades laborales y servicios que ofrecemos para potenciar su carrera.
        </p>
        <button
          onClick={() => navigate('/')}
          className="mt-8 px-6 py-2 border border-white rounded-full hover:bg-white hover:text-emerald-500 transition"
        >
          Iniciar Sesión
        </button>
      </div>

      {/* Lado derecho */}
      <div className="w-1/2 bg-white flex flex-col justify-center items-center p-8">
        <h2 className="text-2xl font-bold text-emerald-500 mb-2">Registro de Candidato</h2>
        <p className="mb-6">Complete el formulario para crear su cuenta personal</p>

        <form className="w-full max-w-sm space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 text-sm font-medium">Nombre Completo</label>
            <input
              type="text"
              name="nombre_completo"
              placeholder="Ingresa tu nombre completo"
              className="w-full border p-2 rounded"
              value={form.nombre_completo}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Correo Electrónico</label>
            <input
              type="email"
              name="email"
              placeholder="ejemplo@correo.com"
              className="w-full border p-2 rounded"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Ubicación</label>
            <input
              type="text"
              name="ubicacion"
              placeholder="Ciudad, País"
              className="w-full border p-2 rounded"
              value={form.ubicacion}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Contraseña</label>
            <input
              type="password"
              name="password"
              placeholder="Crea una contraseña segura"
              className="w-full border p-2 rounded"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-500 text-white font-bold py-2 rounded hover:bg-emerald-600 transition"
          >
            Registrarse
          </button>
        </form>

        {mensaje && <p className="text-green-600 mt-4">{mensaje}</p>}
        {error && <p className="text-red-600 mt-4">{error}</p>}

        <p className="mt-4 text-sm">
          ¿Ya tienes una cuenta?{' '}
          <span
            onClick={() => navigate('/')}
            className="text-emerald-500 underline cursor-pointer"
          >
            Entra Aquí
          </span>
        </p>
      </div>
    </div>
  );
}
