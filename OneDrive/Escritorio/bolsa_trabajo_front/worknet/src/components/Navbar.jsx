import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <h1 className="text-xl font-bold text-gray-800">WorkNet</h1>
      <ul className="flex gap-4">
        <li>
          <Link to="/" className="text-green-600 font-medium hover:underline">
            Iniciar Sesión
          </Link>
        </li>
        <li>
          <Link to="/registro-candidato" className="text-green-600 font-medium hover:underline">
            Registro Candidato
          </Link>
        </li>
        <li>
          <Link to="/registro-empresa" className="text-green-600 font-medium hover:underline">
            Registro Empresa
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
