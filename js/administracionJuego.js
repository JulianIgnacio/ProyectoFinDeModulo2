import Juego from './classJuego.js';
import { sumarioValidacionJuego } from './validacionJuego.js';
import { verificarUserAdmin } from './helpers.js';
verificarUserAdmin();

let listaJuegos = JSON.parse(localStorage.getItem('listaJuegos')) || [];
let crearJuegoNuevo = true;
if (listaJuegos.length !== 0) {
  listaJuegos = listaJuegos.map(
    (juego) =>
      new Juego(
        juego.codigo,
        juego.nombre,
        juego.precio,
        juego.categoria,
        juego.descripcion,
        juego.imagen,
        juego.requisitosProcesador,
        juego.requisitosMemoriaram,
        juego.requisitosAlmacenamiento,
        juego.requisitosTarjetagrafica,
        juego.desarrollador,
        juego.reseniaVoto,
        juego.reseniaDescripcion
      )
  );
}
console.log(listaJuegos);

let formularioAdminJuego = document.getElementById('formJuego');
console.log(formularioAdminJuego);
let codigo = document.getElementById('codigo'),
  nombre = document.getElementById('nombre'),
  precio = document.getElementById('precio'),
  categoria = document.getElementById('categoria'),
  descripcion = document.getElementById('descripcion'),
  imagen = document.getElementById('imagen'),
  requisitosProcesador = document.getElementById('requisitosProcesador'),
  requisitosMemoriaram = document.getElementById('requisitosMemoriaram'),
  requisitosAlmacenamiento = document.getElementById(
    'requisitosAlmacenamiento'
  ),
  requisitosTarjetagrafica = document.getElementById(
    'requisitosTarjetagrafica'
  ),
  desarrollador = document.getElementById('desarrollador');
let modalFormJuego = new bootstrap.Modal(document.getElementById('modalJuego'));
console.log(modalFormJuego);
let btnCrearJuego = document.getElementById('btnCrearJuego');

formularioAdminJuego.addEventListener('submit', prepararFormularioJuego);
btnCrearJuego.addEventListener('click', mostrarFormularioJuego);
document
  .getElementById('modalJuego')
  .addEventListener('hidden.bs.modal', function () {
    limpiarFormulario();
    let modalLabel = document.getElementById('modalLabel');
    modalLabel.innerHTML = 'Crear Juego';
    escrituraInput(nombre);
    escrituraInput(precio);
    escrituraSelect(categoria);
    escrituraInput(descripcion);
    escrituraInput(imagen);
    escrituraSelect(requisitosProcesador);
    escrituraSelect(requisitosMemoriaram);
    escrituraSelect(requisitosAlmacenamiento);
    escrituraSelect(requisitosTarjetagrafica);
    escrituraSelect(desarrollador);
    let btnFormulario = document.getElementById('btnFormulario');
    btnFormulario.style.display = 'block';
  });

cargaInicial();

function cargaInicial() {
  if (listaJuegos.length > 0) {
    listaJuegos.map((juego, indice) => crearFila(juego, indice + 1));
  } else {
    Swal.fire(
      'No hay juegos cargados',
      'Ingrese el primer juego en Opciones',
      'error'
    );
  }
}

function crearFila(juego, indice) {
  let tbody = document.querySelector('#tablaJuego');
  tbody.innerHTML += `<tr>
  <td scope="col">${indice}</td>
  <td class="tamanioCelda text-truncate">
    ${juego.nombre}
  </td>
  <td>
    $ ${juego.precio}
  </td>
  <td class="tamanioCelda text-truncate">
    ${juego.categoria}
  </td>
  <td class="tamanioCelda text-truncate">${juego.imagen}</td>
  <td>
    <button class="btn btn-primary" onclick="verJuego('${juego.codigo}')">
    <i class="bi bi-search"></i>
    </button>
    <button class="btn btn-warning my-2 my-lg-0" onclick="prepararJuego('${juego.codigo}')" >
    <i class="bi bi-pencil"></i>
    </button>
    <button class="btn btn-danger" onclick="borrarJuego('${juego.codigo}')">
    <i class="bi bi-x-lg"></i>
    </button>
  </td>
</tr>`;
}

function prepararFormularioJuego(e) {
  e.preventDefault();
  console.log('aqui creo el juego');
  if (crearJuegoNuevo) {
    crearJuego();
  } else {
    editarJuego();
  }
}

function crearJuego() {
  let validado = sumarioValidacionJuego(
    nombre,
    precio,
    categoria,
    descripcion,
    imagen,
    requisitosProcesador,
    requisitosMemoriaram,
    requisitosAlmacenamiento,
    requisitosTarjetagrafica,
    desarrollador
  );

  if (validado === true) {
    const juegoNuevo = new Juego(
      undefined,
      nombre.value,
      precio.value,
      categoria.value,
      descripcion.value,
      imagen.value,
      requisitosProcesador.value,
      requisitosMemoriaram.value,
      requisitosAlmacenamiento.value,
      requisitosTarjetagrafica.value,
      desarrollador.value,
      0,
      ''
    );
    console.log(juegoNuevo);
    listaJuegos.push(juegoNuevo);
    console.log(listaJuegos);
    guardarEnLocalstorage();
    limpiarFormulario();
    crearFila(juegoNuevo, listaJuegos.length);
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Se guardó correctamente el nuevo juego',
      showConfirmButton: false,
      timer: 2000,
    });
    modalFormJuego.hide();
  } else {
    console.log('entro por el false');
  }
}

function guardarEnLocalstorage() {
  localStorage.setItem('listaJuegos', JSON.stringify(listaJuegos));
}

function limpiarFormulario() {
  formularioAdminJuego.reset();
  let formControls = formularioAdminJuego.querySelectorAll('.form-control');
  formControls.forEach(function (element) {
    element.classList.remove('is-valid', 'is-invalid');
  });
  let formSelects = formularioAdminJuego.querySelectorAll('.form-select');
  formSelects.forEach(function (element) {
    element.classList.remove('is-valid', 'is-invalid');
  });
}

function mostrarFormularioJuego() {
  crearJuegoNuevo = true;
  modalFormJuego.show();
}

window.verJuego = (codigoJuego) => {
  console.log('aqui veo los detalles del juego');
  let juegoBuscado = listaJuegos.find((juego) => juego.codigo === codigoJuego);
  console.log(juegoBuscado);
  modalFormJuego.show();
  codigo.value = juegoBuscado.codigo;
  nombre.value = juegoBuscado.nombre;
  soloLecturaInput(nombre);
  precio.value = juegoBuscado.precio;
  soloLecturaInput(precio);
  categoria.value = juegoBuscado.categoria;
  soloLecturaSelect(categoria);
  descripcion.value = juegoBuscado.descripcion;
  soloLecturaInput(descripcion);
  imagen.value = juegoBuscado.imagen;
  soloLecturaInput(imagen);
  requisitosProcesador.value = juegoBuscado.requisitosProcesador;
  soloLecturaSelect(requisitosProcesador);
  requisitosMemoriaram.value = juegoBuscado.requisitosMemoriaram;
  soloLecturaSelect(requisitosMemoriaram);
  requisitosAlmacenamiento.value = juegoBuscado.requisitosAlmacenamiento;
  soloLecturaSelect(requisitosAlmacenamiento);
  requisitosTarjetagrafica.value = juegoBuscado.requisitosTarjetagrafica;
  soloLecturaSelect(requisitosTarjetagrafica);
  desarrollador.value = juegoBuscado.desarrollador;
  soloLecturaSelect(desarrollador);
  let modalLabel = document.getElementById('modalLabel');
  modalLabel.innerHTML = 'Ver Juego';
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

window.borrarJuego = (codigoJuego) => {
  Swal.fire({
    title: '¿Esta seguro que desea eliminar el juego seleccionado?',
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
      let posicionJuego = listaJuegos.findIndex(
        (juego) => juego.codigo === codigoJuego
      );
      listaJuegos.splice(posicionJuego, 1);
      guardarEnLocalstorage();
      let tbody = document.querySelector('#tablaJuego');
      tbody.removeChild(tbody.children[posicionJuego]);
      Swal.fire(
        'Juego eliminado',
        'El juego fue eliminado correctamente',
        'success'
      );
    }
  });
};

function mandaralLocalstorage() {
  localStorage.setItem('listaJuegos', JSON.stringify(listaJuegos));
}

window.prepararJuego = (codigoJuego) => {
  let juegoBuscado = listaJuegos.find((juego) => juego.codigo === codigoJuego);
  console.log('eeeee', juegoBuscado);
  modalFormJuego.show();
  codigo.value = juegoBuscado.codigo;
  nombre.value = juegoBuscado.nombre;
  precio.value = juegoBuscado.precio;
  categoria.value = juegoBuscado.categoria;
  descripcion.value = juegoBuscado.descripcion;
  imagen.value = juegoBuscado.imagen;
  requisitosProcesador.value = juegoBuscado.requisitosProcesador;
  requisitosMemoriaram.value = juegoBuscado.requisitosMemoriaram;
  requisitosAlmacenamiento.value = juegoBuscado.requisitosAlmacenamiento;
  requisitosTarjetagrafica.value = juegoBuscado.requisitosTarjetagrafica;
  desarrollador.value = juegoBuscado.desarrollador;
  crearJuegoNuevo = false;
  let modalLabel = document.getElementById('modalLabel');
  modalLabel.innerHTML = 'Editar Juego';
  console.log('crearJuegoNue', crearJuegoNuevo);
};
window.editarJuego = () => {
  console.log('aqui quiero editar');
  let posicionJuego = listaJuegos.findIndex(
    (juego) => juego.codigo === codigo.value
  );
  listaJuegos[posicionJuego].nombre = nombre.value;
  listaJuegos[posicionJuego].precio = precio.value;
  listaJuegos[posicionJuego].categoria = categoria.value;
  listaJuegos[posicionJuego].descripcion = descripcion.value;
  listaJuegos[posicionJuego].imagen = imagen.value;
  listaJuegos[posicionJuego].requisitosProcesador = requisitosProcesador.value;
  listaJuegos[posicionJuego].requisitosMemoriaram = requisitosMemoriaram.value;
  listaJuegos[posicionJuego].requisitosAlmacenamiento =
    requisitosAlmacenamiento.value;
  listaJuegos[posicionJuego].requisitosTarjetagrafica =
    requisitosTarjetagrafica.value;
  listaJuegos[posicionJuego].desarrollador = desarrollador.value;
  mandaralLocalstorage();
  let tbody = document.querySelector('#tablaJuego');
  tbody.children[posicionJuego].children[1].innerHTML = nombre.value;
  tbody.children[posicionJuego].children[2].innerHTML = descripcion.value;
  tbody.children[posicionJuego].children[3].innerHTML = imagen.value;
  tbody.children[posicionJuego].children[4].innerHTML = categoria.value;
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: `Se modificó correctamente el juego: ${nombre.value}`,
    showConfirmButton: false,
    timer: 2000,
  });

  modalFormJuego.hide();
};
