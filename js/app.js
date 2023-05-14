import Usuario from "./classUsuario.js";

let listaUsuarios = [];

let usuario = new Usuario(
  "Administrador",
  "Aministrador",
  "aministrador",
  "admin@rollingcode.com",
  "123456Aa$",
  "administrador"
);
listaUsuarios.push(usuario)
guardarEnLocalstorage()
function guardarEnLocalstorage() {
    localStorage.setItem("listaUsuarios", JSON.stringify(listaUsuarios));
  }