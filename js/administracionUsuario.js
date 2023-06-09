import Usuario from './classUsuario.js';
import { sumarioValidacionUsuario } from './validacionUsuario.js';
import { verificarUserAdmin } from './helpers.js';
verificarUserAdmin();

let listaUsuarios = JSON.parse(localStorage.getItem('listaUsuarios')) || [];
let crearUsuarioNuevo = true;
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

let formularioAdminUsuario = document.getElementById('formUsuario');
let codigo = document.getElementById('codigo'),
  nombre = document.getElementById('nombre'),
  apellido = document.getElementById('apellido'),
  correoElectronico = document.getElementById('correoElectronicoPanel'),
  contrasenia = document.getElementById('contraseniaPanel'),
  rol = document.getElementById('rol');
let modalFormUsuario = new bootstrap.Modal(
  document.getElementById('modalUsuario')
);
let btnCrearUsuario = document.getElementById('btnCrearUsuario');
formularioAdminUsuario.addEventListener('submit', prepararFormularioUsuario);
btnCrearUsuario.addEventListener('click', mostrarFormularioUsuario);
document
  .getElementById('modalUsuario')
  .addEventListener('hidden.bs.modal', function () {
    limpiarFormulario();
    let modalLabel = document.getElementById('modalLabel');
    modalLabel.innerHTML = 'Crear Usuario';
    escrituraInput(nombre);
    escrituraInput(apellido);
    escrituraInput(correoElectronico);
    escrituraInput(contrasenia);
    escrituraSelect(rol);
    let btnFormulario = document.getElementById('btnFormulario');
    btnFormulario.style.display = 'block';
  });

cargaInicial();
function cargaInicial() {
  if (listaUsuarios.length > 0) {
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
  let validado = sumarioValidacionUsuario(
    nombre,
    apellido,
    correoElectronico,
    contrasenia,
    rol
  );

  if (validado === true) {
    const usuarioNuevo = new Usuario(
      undefined,
      nombre.value,
      apellido.value,
      correoElectronico.value,
      contrasenia.value,
      rol.value
    );
    listaUsuarios.push(usuarioNuevo);
    guardarEnLocalstorage();
    limpiarFormulario();
    crearFila(usuarioNuevo, listaUsuarios.length);
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
  let formControls = formularioAdminUsuario.querySelectorAll('.form-control');
  formControls.forEach(function (element) {
    element.classList.remove('is-valid', 'is-invalid');
  });
  let formSelects = formularioAdminUsuario.querySelectorAll('.form-select');
  formSelects.forEach(function (element) {
    element.classList.remove('is-valid', 'is-invalid');
  });
}

function mostrarFormularioUsuario() {
  modalFormUsuario.show();
}

window.verUsuario = (codigoUsuario) => {
  let usuarioBuscado = listaUsuarios.find(
    (usuario) => usuario.codigo === codigoUsuario
  );
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
  let modalLabel = document.getElementById('modalLabel');
  modalLabel.innerHTML = 'Ver Usuario';
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
    if (result.isConfirmed) {
      let posicionUsuario = listaUsuarios.findIndex(
        (usuario) => usuario.codigo === codigoUsuario
      );
      listaUsuarios.splice(posicionUsuario);
      guardarEnLocalstorage();
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

window.prepararUsuario = (codigoUsuario) => {
  let usuarioBuscado = listaUsuarios.find(
    (usuario) => usuario.codigo === codigoUsuario
  );
  modalFormUsuario.show();
  codigo.value = usuarioBuscado.codigo;
  nombre.value = usuarioBuscado.nombre;
  apellido.value = usuarioBuscado.apellido;
  correoElectronico.value = usuarioBuscado.correoElectronico;
  contrasenia.value = usuarioBuscado.contrasenia;
  rol.value = usuarioBuscado.rol;
  let modalLabel = document.getElementById('modalLabel');
  modalLabel.innerHTML = 'Editar Usuario';
  crearUsuarioNuevo = false;
};

function editarUsuario() {
  let posicionUsuario = listaUsuarios.findIndex(
    (usuario) => usuario.codigo === codigo.value
  );
  listaUsuarios[posicionUsuario].nombre = nombre.value;
  listaUsuarios[posicionUsuario].apellido = apellido.value;
  listaUsuarios[posicionUsuario].correoElectronico = correoElectronico.value;
  listaUsuarios[posicionUsuario].contrasenia = contrasenia.value;
  listaUsuarios[posicionUsuario].rol = rol.value;
  guardarEnLocalstorage();
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
}
