import { useState } from "react";
import api from "../services/api";

export default function PerfilEmpresa() {
  const [formData, setFormData] = useState({
    logo: null,
    descripcion: "",
    correo_contacto: "",
    telefono: "",
    direccion: "",
    sector: "",
    tamano: "",
    sitio_web: "",
  });

  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setError("");

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    try {
      const response = await api.post("/empresas/crear-perfil/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMensaje(response.data.mensaje);
    } catch (err) {
      setError("Error al guardar el perfil. Intenta de nuevo.");
    }
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <form onSubmit={handleSubmit} className="max-w-6xl mx-auto">
        {/* Título principal - posicionado a la izquierda */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Perfil de Empresa</h2>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Columna izquierda - ocupa 1/3 del espacio */}
          <div className="col-span-4">
            {/* Área de subir logo */}
            <div className="mb-6">
              <label className="border-2 border-emerald-400 rounded-md w-48 h-48 flex flex-col justify-center items-center cursor-pointer">
                <span className="text-emerald-500 font-medium">Subir Logo</span>
                <input
                  type="file"
                  name="logo"
                  accept="image/*"
                  onChange={handleChange}
                  className="hidden"
                />
              </label>
            </div>
            
            {/* Área de descripción */}
            <div className="mb-6">
              <label className="block text-gray-800 font-medium mb-2">Descripción</label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-3 w-full h-32"
                required
              />
            </div>
          </div>
          
          {/* Columna derecha - ocupa 2/3 del espacio */}
          <div className="col-span-8">
            {/* Correo de contacto */}
            <div className="mb-6">
              <label className="block text-gray-800 font-medium mb-2">Correo de Contacto</label>
              <input
                type="email"
                name="correo_contacto"
                value={formData.correo_contacto}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-3 w-full bg-gray-50"
                required
              />
            </div>
            
            {/* Teléfono */}
            <div className="mb-6">
              <label className="block text-gray-800 font-medium mb-2">Teléfono</label>
              <input
                type="text"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-3 w-full bg-gray-50"
              />
            </div>
            
            {/* Dirección */}
            <div className="mb-6">
              <label className="block text-gray-800 font-medium mb-2">Dirección</label>
              <input
                type="text"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-3 w-full bg-gray-50"
              />
            </div>
            
            {/* Sector de la Empresa */}
            <div className="mb-6">
              <label className="block text-gray-800 font-medium mb-2">Sector de la Empresa</label>
              <select
                name="sector"
                value={formData.sector}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-3 w-1/2 bg-gray-50"
                required
              >
                <option value="">Seleccione un sector</option>
                <option value="Tecnología">Tecnología</option>
                <option value="Salud">Salud</option>
                <option value="Finanzas">Finanzas</option>
                <option value="Educación">Educación</option>
              </select>
            </div>
            
            {/* Tamaño de la Empresa */}
            <div className="mb-6">
              <label className="block text-gray-800 font-medium mb-2">Tamaño de la Empresa</label>
              <select
                name="tamano"
                value={formData.tamano}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-3 w-1/2 bg-gray-50"
                required
              >
                <option value="">Seleccione un tamaño</option>
                <option value="Pequeña">Pequeña</option>
                <option value="Mediana">Mediana</option>
                <option value="Grande">Grande</option>
              </select>
            </div>
            
            {/* Sitio Web */}
            <div className="mb-10">
              <label className="block text-gray-800 font-medium mb-2">Sitio Web</label>
              <input
                type="url"
                name="sitio_web"
                value={formData.sitio_web}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-3 w-full bg-gray-50"
              />
            </div>
          </div>
        </div>

        {/* Botón Guardar Perfil - centrado horizontalmente */}
        <div className="flex justify-center mt-8">
          <button
            type="submit"
            className="bg-emerald-500 text-white py-3 px-8 rounded-md hover:bg-emerald-600 font-medium"
          >
            Guardar Perfil
          </button>
        </div>

        {/* Mensajes de éxito o error */}
        {mensaje && <p className="text-green-600 text-center mt-4">{mensaje}</p>}
        {error && <p className="text-red-600 text-center mt-4">{error}</p>}
      </form>
    </div>
  );
}