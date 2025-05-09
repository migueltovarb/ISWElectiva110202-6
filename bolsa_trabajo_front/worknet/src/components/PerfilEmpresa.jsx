import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  const [token, setToken] = useState("");
  const [perfilExistente, setPerfilExistente] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      verificarPerfilExistente(storedToken);
    }
  }, []);

  const verificarPerfilExistente = async (token) => {
    try {
      const response = await api.get("/empresas/mi-perfil/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      if (response.status === 200) {
        setPerfilExistente(true);
        setMensaje("Ya has creado tu perfil de empresa.");
      }
    } catch (err) {
      if (err.response?.status === 404) {
        setPerfilExistente(false);
      } else {
        setError("Error al verificar el perfil existente.");
      }
    }
  };

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

    if (!token) {
      setError("Debes iniciar sesión para crear tu perfil.");
      return;
    }

    if (perfilExistente) {
      setError("Ya has creado tu perfil de empresa.");
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });

    try {
      const response = await api.post("/empresas/crear-perfil/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${token}`,
        },
      });
      setMensaje(response.data.mensaje);
      setPerfilExistente(true);
      setTimeout(() => navigate("/dashboard-empresa"), 2000);
    } catch (err) {
      setError("Error al guardar el perfil. Intenta de nuevo.");
    }
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <form onSubmit={handleSubmit} className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Perfil de Empresa</h2>
        </div>

        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-4">
            <div className="mb-6">
              <label htmlFor="logo" className="border-2 border-emerald-400 rounded-md w-48 h-48 flex flex-col justify-center items-center cursor-pointer">
                <span className="text-emerald-500 font-medium">Subir Logo</span>
                <input
                  id="logo"
                  type="file"
                  name="logo"
                  accept="image/*"
                  onChange={handleChange}
                  className="hidden"
                />
              </label>
            </div>

            <div className="mb-6">
              <label htmlFor="descripcion" className="block text-gray-800 font-medium mb-2">Descripción</label>
              <textarea
                id="descripcion"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-3 w-full h-32"
                required
              />
            </div>
          </div>

          <div className="col-span-8">
            <div className="mb-6">
              <label htmlFor="correo_contacto" className="block text-gray-800 font-medium mb-2">Correo de Contacto</label>
              <input
                id="correo_contacto"
                type="email"
                name="correo_contacto"
                value={formData.correo_contacto}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-3 w-full bg-gray-50"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="telefono" className="block text-gray-800 font-medium mb-2">Teléfono</label>
              <input
                id="telefono"
                type="text"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-3 w-full bg-gray-50"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="direccion" className="block text-gray-800 font-medium mb-2">Dirección</label>
              <input
                id="direccion"
                type="text"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-3 w-full bg-gray-50"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="sector" className="block text-gray-800 font-medium mb-2">Sector de la Empresa</label>
              <select
                id="sector"
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

            <div className="mb-6">
              <label htmlFor="tamano" className="block text-gray-800 font-medium mb-2">Tamaño de la Empresa</label>
              <select
                id="tamano"
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

            <div className="mb-10">
              <label htmlFor="sitio_web" className="block text-gray-800 font-medium mb-2">Sitio Web</label>
              <input
                id="sitio_web"
                type="url"
                name="sitio_web"
                value={formData.sitio_web}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-3 w-full bg-gray-50"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <button
            type="submit"
            className="bg-emerald-500 text-white py-3 px-8 rounded-md hover:bg-emerald-600 font-medium"
            disabled={perfilExistente}
          >
            Guardar Perfil
          </button>
        </div>

        {mensaje && <p className="text-green-600 text-center mt-4">{mensaje}</p>}
        {error && <p className="text-red-600 text-center mt-4">{error}</p>}
      </form>
    </div>
  );
}
