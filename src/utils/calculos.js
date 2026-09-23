export const sumar = (a, b) => a + b;

export const restar = (a, b) => a - b;

export const multiplicar = (a, b) => a * b;

export const dividir = (a, b) => (b === 0 ? 0 : a / b);

export const TASA_IVA = 0.16;

export const calcularIVA = (precio) => {
  return multiplicar(precio, TASA_IVA);
};

export const calcularDescuento = (precio, descuento) =>
  dividir(multiplicar(precio, descuento), 100);

export const calcularTotales = (partidas, descuento = 0) => {
  const subtotal = partidas.reduce(
    (acumulador, { precio, cantidad }) => sumar(acumulador, multiplicar(precio, cantidad)),
    0,
  );
  const montoDescuento = calcularDescuento(subtotal, descuento);
  const base = restar(subtotal, montoDescuento);
  const iva = calcularIVA(base);

  return { subtotal, montoDescuento, iva, total: sumar(base, iva) };
};

export const calcularMargen = (precio, costo) =>
  multiplicar(dividir(restar(precio, costo), precio), 100);

export const formatearMoneda = (cantidad) =>
  cantidad.toLocaleString("es-MX", { style: "currency", currency: "MXN" });

export const formatearFecha = (fechaISO) =>
  new Date(fechaISO).toLocaleString("es-MX", { dateStyle: "medium", timeStyle: "short" });

export const generarFolio = (prefijo, numero) => `${prefijo}-${String(numero).padStart(4, "0")}`;

export const esDeHoy = (fechaISO) =>
  new Date(fechaISO).toDateString() === new Date().toDateString();
