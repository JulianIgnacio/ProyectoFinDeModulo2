import Usuario from './classUsuario.js';
import { sumarioValidacionUsuario } from './validacionUsuario.js';
import { verificarUserAdmin } from './helpers.js';
verificarUserAdmin();

//variables globales
let listaUsuarios = JSON.parse(localStorage.getItem('listaUsuarios')) || [];
let crearUsuarioNuevo = true;
//saber si el array esta no vacio
if (listaUsuarios.length !== 0) {
  //objecto Usuario
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

//manejadores de eventos
formularioAdminUsuario.addEventListener('submit', prepararFormularioUsuario);
btnCrearUsuario.addEventListener('click', mostrarFormularioUsuario);
document
  .getElementById('modalUsuario')
  .addEventListener('hidden.bs.modal', function () {
    //cerrar el modal con el formulario
    limpiarFormulario();
    //se vuelve por defecto el valor del title del formulario
    let modalLabel = document.getElementById('modalLabel');
    modalLabel.innerHTML = 'Crear Usuario';
    //volver los inputs a escritura
    escrituraInput(nombre);
    escrituraInput(apellido);
    escrituraInput(correoElectronico);
    escrituraInput(contrasenia);
    escrituraSelect(rol);
    //volver a mostrar el boton Enviar
    let btnFormulario = document.getElementById('btnFormulario');
    btnFormulario.style.display = 'block';
  });

cargaInicial();

function cargaInicial() {
  if (listaUsuarios.length > 0) {
    //dibujo una fila en la tabla
    listaUsuarios.map((usuario, indice) => crearFila(usuario, indice + 1));
  } else {
    Swal.fire(
      'No hay usuarios cargados',
      'Ingrese el primer usuario en Opciones',
      'error'
    );
  }
}

function crearFila(usuario, indice) {
  let tbody = document.querySelector('#tablaUsuario');
  if (tbody !== null) {
    tbody.innerHTML += `<tr>
  <td scope="col">${indice}</td>
  <td class="tamanioCelda text-truncate">
    ${usuario.nombre}
  </td>
  <td class="tamanioCelda text-truncate" >
    ${usuario.correoElectronico}
  </td>
  <td>
    ${usuario.rol}
  </td>
  <td>
    <button class="btn btn-primary" onclick="verUsuario('${usuario.codigo}')">
    <i class="bi bi-search"></i>
    </button>
    <button class="btn btn-warning my-2 my-md-0"
    onclick="prepararUsuario('${usuario.codigo}')" >
    <i class="bi bi-pencil"></i>
    </button>
    <button class="btn btn-danger" onclick="borrarUsuario('${usuario.codigo}')">
    <i class="bi bi-x-lg"></i>
    </button>
  </td>
</tr>`;
  }
}

function prepararFormularioUsuario(e) {
  e.preventDefault();
  if (crearUsuarioNuevo) {
    crearUsuario();
  } else {
    editarUsuario();
  }
}

function crearUsuario() {
  //validar los datos del formulario
  let validado = sumarioValidacionUsuario(
    nombre,
    apellido,
    correoElectronico,
    contrasenia,
    rol
  );

  if (validado === true) {
    // los datos son validos
    //se crea el objeto
    const usuarioNuevo = new Usuario(
      undefined,
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
    modalFormUsuario.hide();
  }
}

function guardarEnLocalstorage() {
  localStorage.setItem('listaUsuarios', JSON.stringify(listaUsuarios));
}

function limpiarFormulario() {
  formularioAdminUsuario.reset();
  //reiniciar los estilos de validaciones de los campos del formulario Usuario
  let formControls = formularioAdminUsuario.querySelectorAll('.form-control');
  // Eliminar las clases de validación
  formControls.forEach(function (element) {
    element.classList.remove('is-valid', 'is-invalid');
  });
  //reiniciar los estilos de validaciones de los campos del formulario Usuario
  let formSelects = formularioAdminUsuario.querySelectorAll('.form-select');
  // Eliminar las clases de validación
  formSelects.forEach(function (element) {
    element.classList.remove('is-valid', 'is-invalid');
  });
}

function mostrarFormularioUsuario() {
  modalFormUsuario.show();
}

window.verUsuario = (codigoUsuario) => {
  console.log('aqui veo los detalles del usuario');
  //1- buscar el objeto que quiero mostrar en el form
  let usuarioBuscado = listaUsuarios.find(
    (usuario) => usuario.codigo === codigoUsuario
  );
  //2- mostrar el formulario con los datos
  modalFormUsuario.show();
  codigo.value = usuarioBuscado.codigo;
  nombre.value = usuarioBuscado.nombre;
  soloLecturaInput(nombre);
  apellido.value = usuarioBuscado.apellido;
  soloLecturaInput(apellido);
  correoElectronico.value = usuarioBuscado.correoElectronico;
  soloLecturaInput(correoElectronico);
  contrasenia.value = usuarioBuscado.contrasenia;
  soloLecturaInput(contrasenia);
  rol.value = usuarioBuscado.rol;
  soloLecturaSelect(rol);
  //Cambiar el title del modal
  let modalLabel = document.getElementById('modalLabel');
  modalLabel.innerHTML = 'Ver Usuario';
  // ocultar el botón estableciendo su propiedad "display" en "none"
  let btnFormulario = document.getElementById('btnFormulario');
  btnFormulario.style.display = 'none';
};

function soloLecturaInput(input) {
  input.classList.replace('form-control', 'form-control-plaintext');
  input.readOnly = true;
}

function escrituraInput(input) {
  input.classList.replace('form-control-plaintext', 'form-control');
  input.readOnly = false;
}
function soloLecturaSelect(select) {
  select.disabled = true;
}
function escrituraSelect(select) {
  select.disabled = false;
}

window.borrarUsuario = (codigoUsuario) => {
  Swal.fire({
    title: '¿Esta seguro que desea eliminar el Usuario seleccionado?',
    text: 'No se puede revertir este proceso',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Borrar',
    cancelButtonText: 'Cancelar',
  }).then((result) => {
    console.log(result);
    if (result.isConfirmed) {
      //agrega mi codigo de borrar
      //borrar usuario del array
      let posicionUsuario = listaUsuarios.findIndex(
        (usuario) => usuario.codigo === codigoUsuario
      );
      listaUsuarios.splice(posicionUsuario);
      //actualizar el localstorage
      guardarEnLocalstorage();
      //borrar la fila de la tabla
      let tbody = document.querySelector('#tablaUsuario');
      tbody.removeChild(tbody.children[posicionUsuario]);
      Swal.fire(
        'Usuario eliminado',
        'El Usuario fue eliminado correctamente',
        'success'
      );
    }
  });
};

function mandaralLocalstorage() {
  localStorage.setItem('listaUsuarios', JSON.stringify(listaUsuarios));
}

window.prepararUsuario = (codigoUsuario) => {
  //buscar el objeto que quiero mostrar en el form
  let usuarioBuscado = listaUsuarios.find(
    (usuario) => usuario.codigo === codigoUsuario
  );

  //mostrar el formulario con los datos
  modalFormUsuario.show();
  codigo.value = usuarioBuscado.codigo;
  nombre.value = usuarioBuscado.nombre;
  apellido.value = usuarioBuscado.apellido;
  correoElectronico.value = usuarioBuscado.correoElectronico;
  contrasenia.value = usuarioBuscado.contrasenia;
  rol.value = usuarioBuscado.rol;
  //Cambiar el title del modal
  let modalLabel = document.getElementById('modalLabel');
  modalLabel.innerHTML = 'Editar Usuario';
  //cambiar el estado de la variable crearusuario nuevo a false
  crearUsuarioNuevo = false;
};
////////////////////////////////////////////////////////////////////////////////////////////////////////
window.editarUsuario = () => {
  console.log('aqui quiero editar');
  //en que posicion esta almancenado el usuario que quiero editar
  let posicionUsuario = listaUsuarios.findIndex(
    (usuario) => usuario.codigo === codigo.value
  );
  console.log(posicionUsuario);
  //aca se editan los datos del usuario
  listaUsuarios[posicionUsuario].nombre = nombre.value;
  listaUsuarios[posicionUsuario].apellido = apellido.value;
  listaUsuarios[posicionUsuario].correoElectronico = correoElectronico.value;
  listaUsuarios[posicionUsuario].contrasenia = contrasenia.value;
  listaUsuarios[posicionUsuario].rol = rol.value;

  //actualizar el localstorage
  mandaralLocalstorage();
  //actualizar la fila de la tabla
  let tbody = document.querySelector('#tablaUsuario');
  tbody.children[posicionUsuario].children[1].innerHTML = nombre.value;
  tbody.children[posicionUsuario].children[2].innerHTML =
    correoElectronico.value;
  tbody.children[posicionUsuario].children[3].innerHTML = rol.value;
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: `Se modificó correctamente el usuario: ${correoElectronico.value}`,
    showConfirmButton: false,
    timer: 2000,
  });

  modalFormUsuario.hide();
};
