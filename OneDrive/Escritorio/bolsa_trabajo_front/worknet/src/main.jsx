import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // ✅ IMPORTANTE
import './index.css';
import App from './App';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>   {/* ✅ ENVOLVER AQUÍ */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
