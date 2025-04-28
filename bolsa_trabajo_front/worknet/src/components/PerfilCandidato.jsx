import { useState, useEffect } from 'react';
import axios from 'axios';

export default function PerfilCandidato() {
  const [formData, setFormData] = useState({
    descripcion: '',
    educacion: '',
    experiencia: '',
    habilidades: '',
    foto: null,
    curriculum: null
  });

  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [token, setToken] = useState('');
  const [camposFaltantes, setCamposFaltantes] = useState([]);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value
    }));
    
    // Limpiar mensaje de error para este campo
    if (camposFaltantes.includes(name)) {
      setCamposFaltantes(camposFaltantes.filter(campo => campo !== name));
    }
  };

  const validarFormulario = () => {
    const camposRequeridos = ['descripcion', 'educacion', 'experiencia', 'habilidades'];
    const faltantes = camposRequeridos.filter(campo => !formData[campo]);
    
    setCamposFaltantes(faltantes);
    return faltantes.length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');
    setError('');

    // Validar campos requeridos
    if (!validarFormulario()) {
      setError('Por favor completa todos los campos requeridos para continuar.');
      return;
    }

    if (!token) {
      setError('Necesitas iniciar sesión para guardar tu perfil. Por favor, inicia sesión e intenta nuevamente.');
      return;
    }

    const data = new FormData();
    for (const key in formData) {
      if (formData[key]) data.append(key, formData[key]);
    }

    try {
      const response = await axios.post(
        'http://localhost:8000/api/candidatos/crear-perfil/',
        data,
        {
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      setMensaje('¡Felicidades! Tu perfil ha sido guardado correctamente.');
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        setError('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.');
      } else if (err.response?.data) {
        setError('No se pudo guardar el perfil. Por favor, verifica la información e intenta nuevamente.');
      } else {
        setError('Ocurrió un error al conectar con el servidor. Por favor, intenta más tarde.');
      }
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row">
        {/* Columna izquierda */}
        <div className="w-full md:w-1/3 pr-0 md:pr-6">
          <h2 className="text-xl font-bold mb-4 mt-4">Perfil de Candidato</h2>
          
          <div className="border-2 border-emerald-500 rounded w-40 h-40 flex items-center justify-center mb-6">
            <label htmlFor="foto-input" className="text-emerald-500 text-center cursor-pointer">
              Subir Foto
              <input 
                id="foto-input"
                type="file" 
                name="foto" 
                onChange={handleChange} 
                className="hidden" 
                accept="image/*"
              />
            </label>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm mb-1">
              Descripción
              {camposFaltantes.includes('descripcion') && 
                <span className="text-red-500 ml-1">*</span>
              }
            </label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              className={`w-full border ${camposFaltantes.includes('descripcion') ? 'border-red-300' : 'border-gray-300'} rounded p-2 h-28`}
              required
            />
          </div>
        </div>
        
        {/* Columna derecha */}
        <div className="w-full md:w-2/3 mt-4 md:mt-12">
          <div className="mb-4">
            <label className="block text-sm mb-1">
              Educación
              {camposFaltantes.includes('educacion') && 
                <span className="text-red-500 ml-1">*</span>
              }
            </label>
            <textarea 
              name="educacion" 
              value={formData.educacion} 
              onChange={handleChange} 
              className={`w-full border ${camposFaltantes.includes('educacion') ? 'border-red-300' : 'border-gray-300'} rounded p-2 h-12`}
              required 
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm mb-1">
              Experiencia
              {camposFaltantes.includes('experiencia') && 
                <span className="text-red-500 ml-1">*</span>
              }
            </label>
            <textarea 
              name="experiencia" 
              value={formData.experiencia} 
              onChange={handleChange} 
              className={`w-full border ${camposFaltantes.includes('experiencia') ? 'border-red-300' : 'border-gray-300'} rounded p-2 h-16`}
              required 
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm mb-1">
              Habilidades
              <span className="text-red-500 ml-1">*</span>
            </label>
            <textarea 
              name="habilidades" 
              value={formData.habilidades} 
              onChange={handleChange} 
              className={`w-full border ${camposFaltantes.includes('habilidades') ? 'border-red-300' : 'border-gray-300'} rounded p-2 h-16`}
              required 
            />
          </div>
          
          <div className="mb-8">
            <label className="block text-sm mb-2">Subir Curriculum</label>
            <button 
              type="button"
              onClick={() => document.getElementById('curriculum-input').click()}
              className="bg-gray-100 border border-gray-300 rounded px-4 py-2 text-gray-700 w-40"
            >
              Ingresa aquí
            </button>
            <input 
              id="curriculum-input"
              type="file" 
              name="curriculum" 
              onChange={handleChange} 
              className="hidden" 
              accept=".pdf,.doc,.docx"
            />
            {formData.curriculum && (
              <span className="ml-2 text-sm text-green-600">
                {formData.curriculum.name}
              </span>
            )}
          </div>
          
          <div className="flex items-center mb-4">
            <span className="text-red-500 mr-2">*</span>
            <button 
              type="submit" 
              onClick={handleSubmit}
              className="bg-emerald-500 text-white py-2 px-8 rounded hover:bg-emerald-600 w-full max-w-xs"
            >
              Guardar Perfil
            </button>
          </div>
        </div>
      </div>
      
      {mensaje && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mt-4">
          <p>{mensaje}</p>
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}