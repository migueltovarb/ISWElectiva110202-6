import { useNavigate } from 'react-router-dom';

function ElegirTipoCuenta() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex">
      {/* Lado izquierdo */}
      <div className="w-1/2 bg-white flex flex-col justify-center items-center">
        <h2 className="text-3xl font-bold mb-6">Elegir tipo de cuenta</h2>

        <button
          className="bg-green-500 text-white px-6 py-2 rounded mb-4"
          onClick={() => navigate('/registro-candidato')}
        >
          Soy Candidato
        </button>

        <button
          className="border border-green-500 text-green-500 px-6 py-2 rounded"
          onClick={() => navigate('/registro-empresa')}
        >
          Soy Empresa
        </button>

        <p className="mt-4">
          ¿Ya tienes una cuenta?{' '}
          <span
            className="text-green-500 cursor-pointer"
            onClick={() => navigate('/')}
          >
            Iniciar Sesión
          </span>
        </p>
      </div>

      {/* Lado derecho */}
      <div className="w-1/2 bg-emerald-500 text-white flex flex-col justify-center items-center p-10">
        <h1 className="text-4xl font-bold mb-6">¡Bienvenido!</h1>
        <p className="text-center mb-6">
          Elija el tipo de cuenta que desea crear
          <br /> para acceder a todas las funciones
          <br /> específicas para su perfil.
        </p>

        <button
          className="bg-white text-emerald-500 px-6 py-2 rounded-full font-semibold"
          onClick={() => navigate('/')}
        >
          Volver al inicio
        </button>
      </div>
    </div>
  );
}

export default ElegirTipoCuenta;
