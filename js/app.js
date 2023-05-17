import Usuario from './classUsuario.js';

let listaUsuarios = JSON.parse(localStorage.getItem('listaUsuarios')) || [];

const usuarioBuscado = listaUsuarios.some(
  (usuario) =>
    usuario.correoElectronico === 'admin@rollingcode.com' &&
    usuario.contrasenia === '123456Aa$' &&
    usuario.rol === 'administrador'
);

if (!usuarioBuscado) {
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
}
function guardarEnLocalstorage() {
  localStorage.setItem('listaUsuarios', JSON.stringify(listaUsuarios));
}
