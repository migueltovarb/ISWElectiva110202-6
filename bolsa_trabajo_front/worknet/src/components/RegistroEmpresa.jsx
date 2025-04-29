import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 🧭 Importar hook para navegación
import api from '../services/api';

export default function RegistroEmpresa() {
  const navigate = useNavigate(); // 🧭 Inicializar navegación

  const [form, setForm] = useState({
    email: '',
    password: '',
    razon_social: '',
    sector: '',
    ubicacion: ''
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
      const response = await api.post('empresas/registro-empresa/', form);
      if (response.status === 201) {
        setMensaje(response.data.mensaje || 'Empresa registrada exitosamente');
        setForm({
          email: '',
          password: '',
          razon_social: '',
          sector: '',
          ubicacion: ''
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
          setError('Ya existe una empresa registrada con este correo.');
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
          Regístrese con sus datos empresariales para acceder a todas las herramientas y servicios que ofrecemos para potenciar su negocio.
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
        <h2 className="text-2xl font-bold text-emerald-500 mb-2">Registro de Empresa</h2>
        <p className="mb-6">Complete el formulario para crear su cuenta empresarial</p>

        <form className="w-full max-w-sm space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 text-sm font-medium">Razón Social</label>
            <input
              type="text"
              name="razon_social"
              placeholder="Nombre legal de su empresa"
              className="w-full border p-2 rounded"
              value={form.razon_social}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Sector</label>
            <input
              type="text"
              name="sector"
              placeholder="Ej: Tecnología, Salud, Educación, etc."
              className="w-full border p-2 rounded"
              value={form.sector}
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
            <label className="block mb-1 text-sm font-medium">Correo Electrónico</label>
            <input
              type="email"
              name="email"
              placeholder="empresa@ejemplo.com"
              className="w-full border p-2 rounded"
              value={form.email}
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
