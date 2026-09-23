import { useEffect, useState } from "react";
import Icono from "./Icono.js";

function Encabezado({ modulo, sesion, onCerrarSesion }) {
  const [ahora, setAhora] = useState(new Date());
  const [enLinea, setEnLinea] = useState(navigator.onLine);

  useEffect(() => {
    const intervalo = setInterval(() => setAhora(new Date()), 1000);
    return () => clearInterval(intervalo);
  }, []);

  useEffect(() => {
    const conectado = () => setEnLinea(true);
    const desconectado = () => setEnLinea(false);
    window.addEventListener("online", conectado);
    window.addEventListener("offline", desconectado);
    return () => {
      window.removeEventListener("online", conectado);
      window.removeEventListener("offline", desconectado);
    };
  }, []);

  const { titulo, descripcion } = modulo;
  const { nombre, rol } = sesion;
  const iniciales = nombre
    .split(" ")
    .map((palabra) => palabra[0])
    .slice(0, 2)
    .join("");

  return (
    <header className="encabezado">
      <div>
        <h1 className="encabezado__titulo">{titulo}</h1>
        <p className="texto-suave">{descripcion}</p>
      </div>

      <div className="encabezado__acciones">
        <span className={`estado-red ${enLinea ? "" : "estado-red--offline"}`}>
          <span className="estado-red__punto" />
          {enLinea ? "En línea" : "Sin conexión"}
        </span>

        <span className="reloj">
          <Icono nombre="reloj" tamano={16} />
          {ahora.toLocaleDateString("es-MX", { weekday: "short", day: "numeric", month: "short" })}
          {" · "}
          {ahora.toLocaleTimeString("es-MX")}
        </span>

        <div className="perfil">
          <span className="perfil__avatar">{iniciales}</span>
          <div className="perfil__datos">
            <strong>{nombre}</strong>
            <small>{rol}</small>
          </div>
          <button className="boton-icono" onClick={onCerrarSesion} title="Cerrar sesión" aria-label="Cerrar sesión">
            <Icono nombre="salir" tamano={18} />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Encabezado;
