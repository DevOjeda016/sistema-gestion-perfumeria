import React from 'react'
import ReactDOM from 'react-dom/client'
import Aplicacion from './App.js'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Aplicacion />
  </React.StrictMode>
)

if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try {
      const registro = await navigator.serviceWorker.register("/service-worker.js");
      console.log("Service Worker registrado correctamente:", registro.scope);
    } catch (error) {
      console.error("Error al registrar Service Worker:", error);
    }
  });
}
