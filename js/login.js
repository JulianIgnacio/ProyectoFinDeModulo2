import Usuario from './classUsuario.js';
import { verificarUserLogged, logout } from './helpers.js';

verificarUserLogged();

window.onload = function () {
  document.getElementById('logout').addEventListener('click', logout);
  document.getElementById('formLogin').addEventListener('submit', login);
};

function esCorreoValido(correo) {
  var regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regexCorreo.test(correo);
}

function esContraseniaValida(contrasenia) {
  var regexContrasenia =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  return regexContrasenia.test(contrasenia);
}

var modalLogin = new bootstrap.Modal(document.getElementById('modalLogin'));

function login(event) {
  event.preventDefault();
  let listaUsuarios = JSON.parse(localStorage.getItem('listaUsuarios')) || [];

  if (listaUsuarios.length !== 0) {
    listaUsuarios = listaUsuarios.map(
      (usuario) =>
        new Usuario(
          usuario.codigo,
          usuario.nombre,
          usuario.apellido,
          usuario.correoElectronico,
          usuario.contrasenia,
          usuario.rol
        )
    );
  }

  let correoElectronico = document.getElementById('correoElectronico');
  let contrasenia = document.getElementById('contrasenia');
  let div = document.getElementById('opciones_administrador');
  let logout = document.getElementById('logout');
  let botonLogin = document.getElementById('botonLogin');

  let esValidado = listaUsuarios.some(
    (u) =>
      u.correoElectronico === correoElectronico.value &&
      u.contrasenia === contrasenia.value &&
      u.rol === 'normal'
  );

  let esValidadoAdministrador = listaUsuarios.some(
    (u) =>
      u.correoElectronico === correoElectronico.value &&
      u.contrasenia === contrasenia.value &&
      u.rol === 'administrador'
  );
  console.log('esValidado', esValidado);
  console.log('esValidadoAdministrador', esValidadoAdministrador);
  if (!esCorreoValido(correoElectronico.value)) {
    correoElectronico.classList.add('is-invalid');
  } else {
    correoElectronico.classList.remove('is-invalid');
  }

  if (!esContraseniaValida(contrasenia.value)) {
    contrasenia.classList.add('is-invalid');
  } else {
    contrasenia.classList.remove('is-invalid');
  }

  if (esValidadoAdministrador) {
    div.style.display = 'flex';
    modalLogin.hide();
    botonLogin.style.display = 'none';
    sessionStorage.setItem(
      'usuarioLogueado',
      JSON.stringify({
        correoElectronico: correoElectronico.value,
        contrasenia: contrasenia.value,
        rol: 'administrador',
      })
    );
  } else if (esValidado) {
    div.style.display = 'none';
    logout.style.display = 'flex';
    modalLogin.hide();
    botonLogin.style.display = 'none';
    sessionStorage.setItem(
      'usuarioLogueado',
      JSON.stringify({
        correoElectronico: correoElectronico.value,
        contrasenia: contrasenia.value,
        rol: 'normal',
      })
    );
  } else {
    div.style.display = 'none';
    let alertaFormuralio = document.getElementById('alertaFormulario');
    alertaFormuralio.classList.add('d-flex');
    alertaFormuralio.classList.remove('d-none');
  }
}
