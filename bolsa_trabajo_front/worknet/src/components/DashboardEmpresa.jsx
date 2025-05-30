import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Briefcase, Calendar, Users, Building2, Home, Plus, Edit3, Trash2,
  FileText, Filter, MessageCircle, Video, Star, LogOut, Search, MoreHorizontal
} from 'lucide-react';

export default function DashboardEmpresa() {
  const [tab, setTab] = useState('todos');

  const trabajos = [
    {
      id: 1,
      titulo: 'Desarrollador Frontend',
      ubicacion: 'Bogotá',
      jornada: 'Tiempo Completo',
      salario: '$3,000,000 - $4,500,000 COP',
      descripcion: 'Buscamos un desarrollador frontend con experiencia en React, Next.js y Tailwind CSS.',
      tecnologias: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript'],
      publicado: 'hace 2 días',
      postulaciones: 2,
      estado: 'Activo'
    }
  ];

  const tabs = ['Todos', 'Activos', 'Pendientes de Revisión', 'Cerrados'];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 space-y-6 border-r">
        <div className="border-b pb-4">
          <div className="flex items-center justify-between">
            <div className="font-bold text-lg text-emerald-600 flex items-center space-x-2">
              <Building2 size={20} className="text-emerald-600" />
              <span>Nombre Empresa</span>
            </div>
          </div>
        </div>
        <nav className="space-y-4 text-sm text-gray-700">
          <NavItem icon={<Home size={16} />} text="Inicio" to="/dashboard-empresa" />
          <NavItem icon={<Plus size={16} />} text="Publicar Oferta" to="/dashboard-empresa/publicar" />
          <NavItem icon={<Edit3 size={16} />} text="Editar Ofertas" to="/dashboard-empresa/editar" />
          <NavItem icon={<Trash2 size={16} />} text="Eliminar Ofertas" to="/dashboard-empresa/eliminar" />
          <NavItem icon={<FileText size={16} />} text="Postulaciones" to="/dashboard-empresa/postulaciones" />
          <NavItem icon={<Users size={16} />} text="Cambiar Estado" to="/dashboard-empresa/estado" />
          <NavItem icon={<Filter size={16} />} text="Filtrar Candidatos" to="/dashboard-empresa/filtrar" />
          <NavItem icon={<MessageCircle size={16} />} text="Mensajes" to="/dashboard-empresa/mensajes" />
          <NavItem icon={<Video size={16} />} text="Videoentrevistas" to="/dashboard-empresa/videoentrevistas" />
          <NavItem icon={<Star size={16} />} text="Valorar Candidatos" to="/dashboard-empresa/valorar" />
          <NavItem icon={<LogOut size={16} />} text="Cerrar Sesión" to="/logout" textColor="text-red-600 font-semibold" />
        </nav>
      </aside>

      {/* Contenido Principal */}
      <main className="flex-1 bg-gray-50">
        {/* Línea superior */}
        <div className="w-full h-2 bg-gray-100 border-b border-gray-200"></div>

        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-800">Inicio de Empresa</h1>
        </div>

        <div className="px-10 py-6">
          <div className="flex space-x-4 mb-6">
            {tabs.map(op => (
              <button
                key={op}
                onClick={() => setTab(op.toLowerCase())}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${tab === op.toLowerCase() ? 'bg-emerald-500 text-white' : 'bg-white border border-gray-300 text-gray-700'}`}
              >
                {op}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <Card label="Mis Trabajos" valor="1" icon={<Briefcase className="text-emerald-500" size={20} />} />
            <Card label="Postulaciones" valor="2" icon={<Users className="text-blue-500" size={20} />} />
            <Card label="Candidatos Entrevistados" valor="2" icon={<Calendar className="text-purple-500" size={20} />} />
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Mis Trabajos Publicados</h2>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
                <input type="text" placeholder="Buscar trabajos..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-72" />
              </div>
            </div>

            {trabajos.map(job => (
              <div key={job.id} className="border border-gray-200 rounded-xl p-5 mb-6 bg-white">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Briefcase className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-md font-bold text-gray-800 mb-1">{job.titulo}</h3>
                      <p className="text-sm text-gray-500 mb-2">{job.ubicacion} • {job.jornada} • {job.salario}</p>
                      <p className="text-sm text-gray-700 mb-2">{job.descripcion}</p>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {job.tecnologias.map((tag, idx) => (
                          <span key={idx} className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">{job.estado}</span>
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Publicado {job.publicado} • {job.postulaciones} postulaciones</span>
                  <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700">Ver Postulaciones</button>
                </div>
              </div>
            ))}

            <div className="text-center">
              <button className="mt-4 text-sm text-emerald-600 font-medium border border-emerald-500 px-4 py-2 rounded-full">Cargar Más</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, text, to, textColor = 'text-gray-700' }) {
  return (
    <Link to={to} className={`flex items-center space-x-2 hover:text-emerald-600 ${textColor}`}>
      {icon}
      <span>{text}</span>
    </Link>
  );
}

function Card({ label, valor, icon }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow text-center">
      <div className="flex flex-col items-center justify-center space-y-1">
        {icon}
        <div className="text-sm text-gray-600">{label}</div>
        <div className="text-2xl font-bold text-emerald-600">{valor}</div>
      </div>
    </div>
  );
}
