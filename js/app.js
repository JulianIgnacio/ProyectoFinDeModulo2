import Usuario from './classUsuario.js';

let listaUsuarios = [];

let usuario = new Usuario(
  '9999999999',
  'Juan',
  'Perez',
  'admin@rollingcode.com',
  '123456Aa$',
  'administrador'
);
listaUsuarios.push(usuario);
guardarEnLocalstorage();
function guardarEnLocalstorage() {
  localStorage.setItem('listaUsuarios', JSON.stringify(listaUsuarios));
}
