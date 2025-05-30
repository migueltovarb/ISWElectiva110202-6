import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  User,
  Home,
  Search,
  FileText,
  Bell,
  MessageCircle,
  Video,
  Star,
  Linkedin,
  LogOut,
  Briefcase,
  Users,
  Calendar,
  Eye,
  Heart,
  MoreHorizontal,
  Grid,
  BarChart
} from 'lucide-react';

export default function DashboardCandidato() {
  const [tab, setTab] = useState('recomendados');

  const trabajos = [
    {
      id: 1,
      titulo: 'Desarrollador Frontend',
      empresa: 'TechCorp',
      ubicacion: 'Bogotá',
      jornada: 'Tiempo Completo',
      descripcion: 'Buscamos un desarrollador frontend con experiencia en React, Next.js y Tailwind CSS.',
      tecnologias: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript'],
      publicado: 'hace 2 días',
      salario: '$3,000,000 - $4,500,000 COP'
    }
  ];

  const sidebarItems = [
    { icon: Home, label: 'Inicio', to: '/dashboard-candidato' },
    { icon: Search, label: 'Buscar Trabajos', to: '/dashboard-candidato/buscar' },
    { icon: FileText, label: 'Postulación a Ofertas', to: '/dashboard-candidato/postulaciones' },
    { icon: Bell, label: 'Notificaciones', to: '/dashboard-candidato/notificaciones' },
    { icon: MessageCircle, label: 'Mensajes', to: '/dashboard-candidato/mensajes' },
    { icon: Video, label: 'Videoentrevistas', to: '/dashboard-candidato/videoentrevistas' },
    { icon: Star, label: 'Valorar Empresas', to: '/dashboard-candidato/valorar' },
    { icon: Linkedin, label: 'Conectar LinkedIn', to: '/dashboard-candidato/linkedin' }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md border-r border-gray-200 flex flex-col justify-between">
        <div>
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Nombre Candidato</h3>
              </div>
            </div>
          </div>
          <div className="py-4">
            <div className="px-4 mb-4">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">GENERAL</h4>
            </div>
            <nav className="space-y-1">
              {sidebarItems.map((item, idx) => (
                <Link
                  key={idx}
                  to={item.to}
                  className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg mx-2"
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
        <div className="p-4">
          <Link to="/logout" className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg">
            <LogOut className="w-5 h-5 mr-3" />
            Cerrar Sesión
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-900">Inicio de Candidato</h1>
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar trabajos..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Stats */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            <StatCard label="Trabajos Disponibles" value="1" icon={<Briefcase className="text-blue-600 w-6 h-6" />} />
            <StatCard label="Mis Postulaciones" value="2" icon={<Users className="text-green-600 w-6 h-6" />} />
            <StatCard label="Entrevistas" value="2" icon={<Calendar className="text-purple-600 w-6 h-6" />} />
            <StatCard label="Vistas de Perfil" value="2" icon={<Eye className="text-orange-600 w-6 h-6" />} />
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="border-b border-gray-200">
              <div className="flex">
                {['Recomendados', 'Mis Postulaciones', 'Guardados'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t.toLowerCase())}
                    className={`px-6 py-4 text-sm font-medium border-b-2 ${
                      tab === t.toLowerCase()
                        ? 'text-green-600 border-green-600 bg-green-50'
                        : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Jobs */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Trabajos Recomendados</h2>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">Ordenar por:</span>
                  <select className="text-sm border border-gray-300 rounded px-3 py-1 focus:ring-2 focus:ring-green-500">
                    <option>Relevancia</option>
                  </select>
                </div>
              </div>

              {trabajos.map(job => (
                <div key={job.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow mb-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <Briefcase className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{job.titulo}</h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <span>{job.empresa}</span>
                          <span>•</span>
                          <span>{job.ubicacion}</span>
                          <span>•</span>
                          <span>{job.jornada}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-red-500">
                        <Heart className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4">{job.descripcion}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.tecnologias.map((tec, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full"
                      >
                        {tec}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>Publicado {job.publicado}</span>
                      <span>•</span>
                      <span>{job.salario}</span>
                    </div>
                    <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium">
                      Postular Ahora
                    </button>
                  </div>
                </div>
              ))}

              <div className="text-center mt-6">
                <button className="text-green-600 hover:text-green-700 font-medium">
                  Cargar Más
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ label, value, icon }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{label}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className="p-3 rounded-lg bg-gray-50">
          {icon}
        </div>
      </div>
    </div>
  );
}
