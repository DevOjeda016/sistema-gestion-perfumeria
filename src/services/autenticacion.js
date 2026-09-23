import { usuarios } from "../data/datosIniciales.js";

export const verificarUsuario = (usuario, password) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const encontrado = usuarios.find(
        (registro) =>
          registro.usuario === usuario.trim().toLowerCase() && registro.password === password,
      );

      if (encontrado) {
        const { password: _omitida, ...datosSesion } = encontrado;
        resolve(datosSesion);
      } else {
        reject("Usuario o contraseña incorrectos");
      }
    }, 1500);
  });
