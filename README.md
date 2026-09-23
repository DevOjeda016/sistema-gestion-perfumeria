# Aroma · Sistema de Gestión para Perfumería (PWA)

Aplicación Web Progresiva hecha con **React + Vite**. Tiene 4 módulos: **Login, Compras, Inventario y Ventas**.
No usa backend ni base de datos: los datos viven en memoria y se guardan en `localStorage` para que no se pierdan al recargar.

## Cómo ejecutarla

```bash
npm install
npm run dev        # modo desarrollo
npm run build      # genera la carpeta dist
npm run preview    # sirve la versión compilada (aquí se puede probar el modo offline e instalarla)
```

Usuarios de prueba:

| Usuario  | Contraseña | Rol           |
| -------- | ---------- | ------------- |
| admin    | admin123   | Administrador |
| vendedor | venta123   | Vendedora     |

## Módulos

- **Login**: valida al usuario con una Promesa (1.5 s de espera simulada). Después de 3 intentos fallidos se bloquea 10 segundos con una cuenta regresiva.
- **Inventario**: indicadores, alerta de stock bajo, búsqueda, filtro por categoría, alta, edición y eliminación de productos.
- **Compras**: órdenes de compra a proveedores con subtotal, IVA y total. Al registrarla aumenta el stock y se actualiza el costo.
- **Ventas**: punto de venta con carrito, descuento en %, IVA y método de pago. Al cobrar disminuye el stock. Incluye historial.

## Progressive Web App

- `public/manifest.webmanifest`: nombre, colores, modo `standalone` e íconos (se puede instalar).
- `public/service-worker.js`: guarda la app en caché al instalarse, borra cachés viejos al activarse y responde sin conexión.
- `src/main.js`: registra el Service Worker.
- En el encabezado se muestra si hay conexión (eventos `online` / `offline`) y en la barra lateral aparece **Instalar aplicación** cuando el navegador lo permite.

## Conceptos de la carpeta `prueba 1` y dónde se usan

| Archivo de práctica      | Concepto                                         | Dónde se aplica |
| ------------------------ | ------------------------------------------------ | --------------- |
| `app.js`                 | `const` / `let`, template literals, cálculo de descuento `(precio * descuento) / 100` | `src/utils/calculos.js` (`calcularDescuento`, `generarFolio`), descuento en `src/modules/Ventas.js`, variable `let tiempo` en `src/components/Login.js` |
| `appArreglada.js`        | `forEach`, `map`, `filter`, `find`, `some`, `reduce` | `forEach`: `borrarDatos` en `src/services/almacenamiento.js` · `map`: tablas y listas de todos los módulos · `filter`: búsqueda y stock bajo en Inventario · `find`: `verificarUsuario`, carrito · `some`: productos agotados, validación de stock al cobrar · `reduce`: totales, valor del inventario, ingresos |
| `appArrow.js`            | Funciones flecha `sumar`, `restar`, `multiplicar`, `dividir`, `calcularIVA` | `src/utils/calculos.js` (se usan en Compras, Ventas, Inventario y `App.js`) |
| `appDesestructurada.js`  | Desestructuración de objetos                     | Props de todos los componentes, `const { nombre, rol } = sesion` en `Encabezado.js`, `const { subtotal, iva, total } = calcularTotales(...)`, `const { password, ...datosSesion }` en `autenticacion.js`, propiedad dinámica en `datosIniciales.js` |
| `appInterval.js`         | `setInterval` / `clearInterval`                  | Cuenta regresiva de bloqueo en `Login.js` y reloj en vivo en `Encabezado.js` |
| `appPrometida.js`        | `new Promise`, `resolve` / `reject`, `setTimeout`, `.then` / `.catch` | `verificarUsuario` en `src/services/autenticacion.js` (usado con `.then/.catch/.finally` en `Login.js`), `procesarOperacion` en `almacenamiento.js` (con `.then` en Compras y con `async/await` en Ventas) |

## Estructura

```
public/
  manifest.webmanifest
  service-worker.js
  icons/
src/
  main.js                 registro del Service Worker
  App.js                  estado global, sesión y navegación entre módulos
  components/             Login, BarraLateral, Encabezado, Icono, Comunes
  modules/                Inventario, Compras, Ventas
  services/               autenticacion (Promise), almacenamiento (localStorage)
  data/datosIniciales.js  usuarios, proveedores, productos y operaciones de ejemplo
  utils/calculos.js       funciones flecha de cálculo
```
