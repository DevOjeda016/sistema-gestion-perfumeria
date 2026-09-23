import Icono from "./Icono.js";

export function Indicador({ icono, titulo, valor, detalle, tono = "morado", compacto = false }) {
  return (
    <div className="indicador">
      <span className={`indicador__icono indicador__icono--${tono}`}>
        <Icono nombre={icono} />
      </span>
      <div>
        <span className="indicador__titulo">{titulo}</span>
        <strong className={`indicador__valor ${compacto ? "indicador__valor--compacto" : ""}`}>{valor}</strong>
        {detalle && <small className="indicador__detalle">{detalle}</small>}
      </div>
    </div>
  );
}

export function Pestanas({ opciones, activa, onCambiar }) {
  return (
    <div className="pestanas">
      {opciones.map(({ id, etiqueta }) => (
        <button
          key={id}
          className={`pestanas__opcion ${activa === id ? "pestanas__opcion--activa" : ""}`}
          onClick={() => onCambiar(id)}
        >
          {etiqueta}
        </button>
      ))}
    </div>
  );
}

export function Vacio({ icono = "vacio", titulo, texto }) {
  return (
    <div className="vacio">
      <Icono nombre={icono} tamano={32} />
      <strong>{titulo}</strong>
      {texto && <p>{texto}</p>}
    </div>
  );
}

export function Notificaciones({ lista, onCerrar }) {
  return (
    <div className="notificaciones">
      {lista.map(({ id, mensaje, tipo }) => (
        <div key={id} className={`notificacion notificacion--${tipo}`}>
          <Icono nombre={tipo === "error" ? "alerta" : "check"} tamano={18} />
          <span>{mensaje}</span>
          <button className="boton-icono" onClick={() => onCerrar(id)} aria-label="Cerrar">
            <Icono nombre="cerrar" tamano={16} />
          </button>
        </div>
      ))}
    </div>
  );
}
