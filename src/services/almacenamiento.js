import { useEffect, useState } from "react";

const PREFIJO = "aroma-gestion:";

export const leerDato = (clave, valorInicial) => {
  try {
    const guardado = localStorage.getItem(`${PREFIJO}${clave}`);
    return guardado ? JSON.parse(guardado) : valorInicial;
  } catch (error) {
    return valorInicial;
  }
};

export const guardarDato = (clave, valor) => {
  try {
    localStorage.setItem(`${PREFIJO}${clave}`, JSON.stringify(valor));
  } catch (error) {}
};

export const borrarDatos = (claves) => {
  claves.forEach((clave) => {
    try {
      localStorage.removeItem(`${PREFIJO}${clave}`);
    } catch (error) {}
  });
};

export const useEstadoPersistente = (clave, valorInicial) => {
  const [valor, setValor] = useState(() => leerDato(clave, valorInicial));

  useEffect(() => {
    guardarDato(clave, valor);
  }, [clave, valor]);

  return [valor, setValor];
};

export const procesarOperacion = (operacion, demora = 900) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (operacion.partidas.length === 0) {
        reject("La operación no tiene productos");
      } else {
        resolve(operacion);
      }
    }, demora);
  });
