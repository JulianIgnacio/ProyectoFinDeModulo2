import Usuario from "./classUsuario.js";
import { sumarioValidacionRegistro } from './validacionRegistro.js';

let listaUsuarios = JSON.parse(localStorage.getItem("listaUsuarios")) || [];

if (listaUsuarios.length !== 0) {
  //objecto Usuario
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

let formRegistro = document.getElementById("formRegistro");

let nombre = document.getElementById("nombreRegistro"),
  apellido = document.getElementById("apellidoRegistro"),
  correo = document.getElementById("correoElectronicoRegistro"),
  contrasenia = document.getElementById("contraseniaRegistro"),
  confirmarContrasenia = document.getElementById(
    "confirmarContraseniaRegistro"
  );
  
let modalFormRegistro = new bootstrap.Modal(
  document.getElementById("modalRegistro")
);

let btnRegistro = document.getElementById("btnRegistro");

formRegistro.addEventListener("submit", prepararFormRegistro);
btnRegistro.addEventListener("click", mostrarFormRegistro);

document
  .getElementById('modalRegistro')
  .addEventListener('hidden.bs.modal', function () {
    //cerrar el modal con el formulario
    limpiarFormulario();
  });

function prepararFormRegistro(e) {
    e.preventDefault();
    crearRegistro();
}

function crearRegistro() {
    //validar los datos del formulario
    let validado = sumarioValidacionRegistro(
      nombre,
      apellido,
      correo,
      contrasenia,
      confirmarContrasenia, 
    );
  
    if (validado === true) {
      // los datos son validos
      //se crea el objeto
      const usuarioNuevo = new Usuario(
        undefined,
        nombre.value,
        apellido.value,
        correo.value,
        contrasenia.value,
        confirmarContrasenia.value,
        "normal"
      );
      console.log(usuarioNuevo);
      //la voy agregar en un array
      listaUsuarios.push(usuarioNuevo);
      //almacenar el array de pelis en localsotarge
      guardarEnLocalstorage();
      //cerrar el modal con el formulario
      limpiarFormulario();
      //avisar con una alerta que se grabó un nuevo usuario
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
    //reiniciar los estilos de validaciones de los campos del formulario Usuario
    let formControls = formRegistro.querySelectorAll('.form-control');
    // Eliminar las clases de validación
    formControls.forEach(function (element) {
      element.classList.remove('is-valid', 'is-invalid');
    });
    //reiniciar los estilos de validaciones de los campos del formulario Usuario
    let formSelects = formRegistro.querySelectorAll('.form-select');
    // Eliminar las clases de validación
    formSelects.forEach(function (element) {
      element.classList.remove('is-valid', 'is-invalid');
    });
  }
  
  function mostrarFormRegistro() {
    modalFormRegistro.show();
  }
