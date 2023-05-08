import Usuario from './classUsuario.js';
import { sumarioValidacionUsuario } from './validacionUsuario.js';

//variables globales
let listaUsuarios = JSON.parse(localStorage.getItem('listaUsuarios')) || [];
//saber si el array esta no vacio
if (listaUsuarios.length !== 0) {
  //objecto Usuario
  listaUsuarios = listaUsuarios.map(
    (usuario) =>
      new Usuario(
        usuario.nombre,
        usuario.apellido,
        usuario.correoElectronico,
        usuario.contrasenia,
        usuario.descripcion,
        usuario.rol
      )
  );
}
console.log(listaUsuarios);

//variables del objeto Usuario del modal Usuario
let formularioAdminUsuario = document.getElementById('formUsuario');
console.log(formularioAdminUsuario);
let codigo = document.getElementById('codigo'),
  nombre = document.getElementById('nombre'),
  apellido = document.getElementById('apellido'),
  correoElectronico = document.getElementById('correoElectronico'),
  contrasenia = document.getElementById('contrasenia'),
  rol = document.getElementById('rol');
let modalFormUsuario = new bootstrap.Modal(
  document.getElementById('modalUsuario')
);
console.log(modalFormUsuario);
let btnCrearUsuario = document.getElementById('btnCrearUsuario');
let alerta = document.getElementById('alerta');

//manejadores de eventos
formularioAdminUsuario.addEventListener('submit', prepararFormularioUsuario);
btnCrearUsuario.addEventListener('click', mostrarFormularioUsuario);

cargaInicial();

function cargaInicial() {
  if (listaUsuarios.length > 0) {
    //dibujo una fila en la tabla
    listaUsuarios.map((usuario) => crearFila(usuario));
  }
}

function crearFila(usuario) {
  let tbody = document.querySelector('#tablaUsuario');
  tbody.innerHTML += `<tr>
  <td scope="col">1</td>
  <td>${usuario.nombre}</td>
  <td>
    ${usuario.apellido}
  </td>
  <td >
    ${usuario.correoElectronico}
  </td>
  <td>
    <button class="btn btn-primary">
    <i class="bi bi-search"></i>
    </button>
    <button class="btn btn-warning my-2 my-md-0">
    <i class="bi bi-pencil"></i>
    </button>
    <button class="btn btn-danger">
    <i class="bi bi-x-lg"></i>
    </button>
  </td>
</tr>`;
}

function prepararFormularioUsuario(e) {
  e.preventDefault();
  console.log('aqui creo el usuario');
  crearUsuario();
}

function crearUsuario() {
  //validar los datos del formulario
  let resumen = sumarioValidacionUsuario(
    nombre.value,
    apellido.value,
    correoElectronico.value,
    contrasenia.value,
    rol.value
  );

  if (resumen.length === 0) {
    // los datos son validos
    //se crea el objeto
    const usuarioNuevo = new Usuario(
      nombre.value,
      apellido.value,
      correoElectronico.value,
      contrasenia.value,
      rol.value
    );
    console.log(usuarioNuevo);
    //la voy agregar en un array
    listaUsuarios.push(usuarioNuevo);
    console.log(listaUsuarios);
    //almacenar el array de pelis en localsotarge
    guardarEnLocalstorage();
    //cerrar el modal con el formulario
    limpiarFormulario();
    //dibujar la fila nueva en la tabla
    crearFila(usuarioNuevo, listaUsuarios.length);
    //avisar con una alerta que se grabó un nuevo usuario
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Se guardó correctamente el nuevo usuario',
      showConfirmButton: false,
      timer: 2000,
    });
    //reiniciar la validación de los campos del modal de bootstrap
    document
      .getElementsByClassName('needs-validation')[0]
      .classList.remove('was-validated');
    //se limpia el resumen de la alerta
    alerta.innerHTML = '';
    alerta.className = '';
    //se oculta el modal
    modalFormUsuario.hide();
  } else {
    //mostrar al usuario el cartel de error
    alerta.innerHTML = resumen;
    alerta.className = 'alert alert-danger mt-3';
  }
}

function guardarEnLocalstorage() {
  localStorage.setItem('listaUsuarios', JSON.stringify(listaUsuarios));
}

function limpiarFormulario() {
  formularioAdminUsuario.reset();
}

function mostrarFormularioUsuario() {
  modalFormUsuario.show();
}
