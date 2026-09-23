import { useEffect, useRef, useState } from "react";
import Icono from "./Icono.js";
import { verificarUsuario } from "../services/autenticacion.js";

const MAX_INTENTOS = 3;
const SEGUNDOS_BLOQUEO = 10;

const CUENTAS_DEMO = [
  { usuario: "admin", password: "admin123", rol: "Administrador" },
  { usuario: "vendedor", password: "venta123", rol: "Vendedora" },
];

function Login({ onIngresar }) {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [verificando, setVerificando] = useState(false);
  const [error, setError] = useState("");
  const [intentos, setIntentos] = useState(0);
  const [tiempoBloqueo, setTiempoBloqueo] = useState(0);
  const intervaloRef = useRef(null);

  useEffect(() => () => clearInterval(intervaloRef.current), []);

  const bloqueado = tiempoBloqueo > 0;

  const iniciarBloqueo = () => {
    let tiempo = SEGUNDOS_BLOQUEO;
    setTiempoBloqueo(tiempo);

    intervaloRef.current = setInterval(() => {
      tiempo--;
      setTiempoBloqueo(tiempo);

      if (tiempo <= 0) {
        clearInterval(intervaloRef.current);
        setIntentos(0);
        setError("");
      }
    }, 1000);
  };

  const manejarEnvio = (evento) => {
    evento.preventDefault();
    if (bloqueado || verificando) return;

    if (!usuario.trim() || !password) {
      setError("Escribe tu usuario y contraseña");
      return;
    }

    setVerificando(true);
    setError("");

    verificarUsuario(usuario, password)
      .then((datosUsuario) => {
        onIngresar(datosUsuario);
      })
      .catch((mensaje) => {
        const nuevosIntentos = intentos + 1;
        setIntentos(nuevosIntentos);
        setPassword("");

        if (nuevosIntentos >= MAX_INTENTOS) {
          setError("Demasiados intentos fallidos.");
          iniciarBloqueo();
        } else {
          setError(`${mensaje}. Te quedan ${MAX_INTENTOS - nuevosIntentos} intento(s).`);
        }
      })
      .finally(() => {
        setVerificando(false);
      });
  };

  const usarCuentaDemo = ({ usuario, password }) => {
    if (bloqueado) return;
    setUsuario(usuario);
    setPassword(password);
    setError("");
  };

  return (
    <div className="login">
      <section className="login__marca">
        <div className="marca">
          <img src="/icons/icon-192.svg" alt="" className="marca__logo" />
          <span className="marca__nombre">Aroma</span>
        </div>
        <div className="login__mensaje">
          <h1>Gestiona tu perfumería desde un solo lugar.</h1>
          <p>Controla tus compras a proveedores, el inventario y las ventas del día.</p>
          <ul className="login__lista">
            <li><Icono nombre="compras" tamano={18} /> Registro de compras a proveedores</li>
            <li><Icono nombre="inventario" tamano={18} /> Inventario con alertas de stock</li>
            <li><Icono nombre="ventas" tamano={18} /> Punto de venta con descuentos e IVA</li>
          </ul>
        </div>
      </section>

      <section className="login__panel">
        <form className="login__formulario" onSubmit={manejarEnvio}>
          <div className="marca marca--movil">
            <img src="/icons/icon-192.svg" alt="" className="marca__logo" />
            <span className="marca__nombre">Aroma</span>
          </div>
          <h2>Iniciar sesión</h2>
          <p className="texto-suave">Ingresa tus credenciales para continuar</p>

          <label className="campo">
            <span>Usuario</span>
            <div className="campo__control">
              <Icono nombre="usuario" tamano={18} />
              <input
                type="text"
                value={usuario}
                onChange={(evento) => setUsuario(evento.target.value)}
                placeholder="Ej. admin"
                autoComplete="username"
                disabled={bloqueado}
              />
            </div>
          </label>

          <label className="campo">
            <span>Contraseña</span>
            <div className="campo__control">
              <Icono nombre="candado" tamano={18} />
              <input
                type="password"
                value={password}
                onChange={(evento) => setPassword(evento.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                disabled={bloqueado}
              />
            </div>
          </label>

          {error && (
            <div className="aviso aviso--error">
              <Icono nombre="alerta" tamano={18} />
              <span>
                {error}
                {bloqueado && ` Intenta de nuevo en ${tiempoBloqueo} s.`}
              </span>
            </div>
          )}

          <button type="submit" className="boton boton--primario boton--bloque" disabled={verificando || bloqueado}>
            {verificando ? (
              <>
                <span className="spinner" /> Verificando usuario...
              </>
            ) : bloqueado ? (
              `Bloqueado (${tiempoBloqueo})`
            ) : (
              "Ingresar"
            )}
          </button>

          <div className="login__demo">
            <span className="texto-suave">Cuentas de prueba</span>
            <div className="login__demo-lista">
              {CUENTAS_DEMO.map((cuenta) => (
                <button type="button" key={cuenta.usuario} className="chip-demo" onClick={() => usarCuentaDemo(cuenta)}>
                  <strong>{cuenta.usuario}</strong>
                  <span>{cuenta.password} · {cuenta.rol}</span>
                </button>
              ))}
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Login;
