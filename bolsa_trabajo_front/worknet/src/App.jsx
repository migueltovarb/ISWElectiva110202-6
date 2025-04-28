import React from 'react';
import { Routes, Route } from 'react-router-dom';

import InicioSesion from './components/InicioSesion';
import RegistroCandidato from './components/RegistroCandidato';
import RegistroEmpresa from './components/RegistroEmpresa';
import ElegirTipoCuenta from './components/ElegirTipoCuenta';
import RestablecerContrasena from './components/RestablecerContrasena'; // desde enlace
import EnviarRecuperacionCorreo from './components/EnviarRecuperacionCorreo'; // ingresar correo
import PerfilEmpresa from "./components/PerfilEmpresa";
import PerfilCandidato from './components/PerfilCandidato';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route path="/" element={<InicioSesion />} />
        <Route path="/seleccionar-cuenta" element={<ElegirTipoCuenta />} />
        <Route path="/registro-candidato" element={<RegistroCandidato />} />
        <Route path="/registro-empresa" element={<RegistroEmpresa />} />
        <Route path="/perfil-empresa" element={<PerfilEmpresa />} />
        <Route path="/perfil-candidato" element={<PerfilCandidato />} />

        
        {/* ✅ Paso 1: Ingresar correo */}
        <Route path="/recuperar" element={<EnviarRecuperacionCorreo />} />
        
        {/* ✅ Paso 2: Confirmar desde enlace con uid/token */}
        <Route path="/recuperar/confirmar/:uidb64/:token" element={<RestablecerContrasena />} />
      </Routes>
    </div>
  );
}

export default App;
