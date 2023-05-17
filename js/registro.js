import Usuario from './classUsuario.js';
import { sumarioValidacionRegistro } from './validacionRegistro.js';

let listaUsuarios = JSON.parse(localStorage.getItem('listaUsuarios')) || [];
if (listaUsuarios.length !== 0) {
  listaUsuarios = listaUsuarios.map(
    (usuario) =>
      new Usuario(
        usuario.nombre,
        usuario.apellido,
        usuario.correoElectronico,
        usuario.contrasenia,
        usuario.confirmarContrasenia,
        usuario.rol
      )
  );
}

let formRegistro = document.getElementById('formRegistro');
let nombre = document.getElementById('nombreRegistro'),
  apellido = document.getElementById('apellidoRegistro'),
  correo = document.getElementById('correoElectronicoRegistro'),
  contrasenia = document.getElementById('contraseniaRegistro'),
  confirmarContrasenia = document.getElementById(
    'confirmarContraseniaRegistro'
  );

let modalFormRegistro = new bootstrap.Modal(
  document.getElementById('modalRegistro')
);

let btnRegistro = document.getElementById('btnRegistro');

formRegistro.addEventListener('submit', prepararFormRegistro);
btnRegistro.addEventListener('click', mostrarFormRegistro);

document
  .getElementById('modalRegistro')
  .addEventListener('hidden.bs.modal', function () {
    limpiarFormulario();
  });

function prepararFormRegistro(e) {
  e.preventDefault();
  crearRegistro();
}

function crearRegistro() {
  let validado = sumarioValidacionRegistro(
    nombre,
    apellido,
    correo,
    contrasenia,
    confirmarContrasenia
  );

  if (validado === true) {
    const usuarioNuevo = new Usuario(
      undefined,
      nombre.value,
      apellido.value,
      correo.value,
      contrasenia.value,
      confirmarContrasenia.value,
      'normal'
    );
    console.log(usuarioNuevo);
    listaUsuarios.push(usuarioNuevo);
    guardarEnLocalstorage();
    limpiarFormulario();
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Se guardó correctamente el nuevo usuario',
      showConfirmButton: false,
      timer: 2000,
    });
    modalFormRegistro.hide();
  }
}

function guardarEnLocalstorage() {
  localStorage.setItem('listaUsuarios', JSON.stringify(listaUsuarios));
}

function limpiarFormulario() {
  formRegistro.reset();
  let formControls = formRegistro.querySelectorAll('.form-control');
  formControls.forEach(function (element) {
    element.classList.remove('is-valid', 'is-invalid');
  });
  let formSelects = formRegistro.querySelectorAll('.form-select');
  formSelects.forEach(function (element) {
    element.classList.remove('is-valid', 'is-invalid');
  });
}

function mostrarFormRegistro() {
  modalFormRegistro.show();
}
