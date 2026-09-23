import Icono from "./Icono.js";

function BarraLateral({ modulos, moduloActivo, onCambiar, onRestablecer, onInstalar }) {
  return (
    <aside className="barra">
      <div className="marca barra__marca">
        <img src="/icons/icon-192.svg" alt="" className="marca__logo" />
        <div>
          <span className="marca__nombre">Aroma</span>
          <small className="marca__sub">Sistema de gestión</small>
        </div>
      </div>

      <nav className="barra__nav">
        {modulos.map(({ id, titulo, icono }) => (
          <button
            key={id}
            className={`barra__enlace ${moduloActivo === id ? "barra__enlace--activo" : ""}`}
            onClick={() => onCambiar(id)}
          >
            <Icono nombre={icono} />
            <span>{titulo}</span>
          </button>
        ))}
      </nav>

      <div className="barra__pie">
        {onInstalar && (
          <button className="barra__accion" onClick={onInstalar}>
            <Icono nombre="descargar" tamano={18} /> Instalar aplicación
          </button>
        )}
        <button className="barra__accion" onClick={onRestablecer}>
          <Icono nombre="reiniciar" tamano={18} /> Restablecer datos demo
        </button>
      </div>
    </aside>
  );
}

export default BarraLateral;
