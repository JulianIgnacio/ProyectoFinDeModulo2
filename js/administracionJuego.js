import Juego from './classJuego.js';
import { sumarioValidacionJuego } from './validacionJuego.js';
import { verificarUser } from './helpers.js';
verificarUser();

//variables globales
let listaJuegos = JSON.parse(localStorage.getItem('listaJuegos')) || [];
//saber si el array esta no vacio
if (listaJuegos.length !== 0) {
  //objecto Juego
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

//variables del objeto Juego del modal Juego
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

//manejadores de eventos
formularioAdminJuego.addEventListener('submit', prepararFormularioJuego);
btnCrearJuego.addEventListener('click', mostrarFormularioJuego);
document
  .getElementById('modalJuego')
  .addEventListener('hidden.bs.modal', function () {
    //cerrar el modal con el formulario
    limpiarFormulario();
    //se vuelve por defecto el valor del title del formulario
    let modalLabel = document.getElementById('modalLabel');
    modalLabel.innerHTML = 'Crear Juego';
    //volver los inputs a escritura
    escrituraInput(nombre);
    escrituraInput(precio);
    escrituraSelect(categoria);
    escrituraInput(descripcion);
    escrituraInput(imagen);
    escrituraInput(requisitosProcesador);
    escrituraSelect(requisitosMemoriaram);
    escrituraSelect(requisitosAlmacenamiento);
    escrituraSelect(requisitosTarjetagrafica);
    escrituraSelect(desarrollador);
    //volver a mostrar el boton Enviar
    let btnFormulario = document.getElementById('btnFormulario');
    btnFormulario.style.display = 'block';
  });

cargaInicial();

function cargaInicial() {
  if (listaJuegos.length > 0) {
    //dibujo una fila en la tabla
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
  <td>${juego.nombre}</td>
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
    <button class="btn btn-warning my-2 my-lg-0">
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
  crearJuego();
}

function crearJuego() {
  //validar los datos del formulario
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
    // los datos son validos
    //se crea el objeto
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
      0, //reseniaVoto
      '' //reseniaDescripcion
    );
    console.log(juegoNuevo);
    //la voy agregar en un array
    listaJuegos.push(juegoNuevo);
    console.log(listaJuegos);
    //almacenar el array de pelis en localsotarge
    guardarEnLocalstorage();
    //cerrar el modal con el formulario
    limpiarFormulario();
    //dibujar la fila nueva en la tabla
    crearFila(juegoNuevo, listaJuegos.length);
    //avisar con una alerta que se grabó un nuevo juego
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Se guardó correctamente el nuevo juego',
      showConfirmButton: false,
      timer: 2000,
    });
    //se oculta el modal
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
  //reiniciar los estilos de validaciones de los campos del formulario Juego
  let formControls = formularioAdminJuego.querySelectorAll('.form-control');
  // Eliminar las clases de validación
  formControls.forEach(function (element) {
    element.classList.remove('is-valid', 'is-invalid');
  });
  //reiniciar los estilos de validaciones de los campos del formulario Juego
  let formSelects = formularioAdminJuego.querySelectorAll('.form-select');
  // Eliminar las clases de validación
  formSelects.forEach(function (element) {
    element.classList.remove('is-valid', 'is-invalid');
  });
}

function mostrarFormularioJuego() {
  modalFormJuego.show();
}

window.verJuego = (codigoJuego) => {
  console.log('aqui veo los detalles del juego');
  //1- buscar el objeto que quiero mostrar en el form
  let juegoBuscado = listaJuegos.find((juego) => juego.codigo === codigoJuego);
  console.log(juegoBuscado);
  //2- mostrar el formulario con los datos
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
  //Cambiar el title del modal
  let modalLabel = document.getElementById('modalLabel');
  modalLabel.innerHTML = 'Ver Juego';
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
      //agrega mi codigo de borrar
      //borrar juego del array
      let posicionJuego = listaJuegos.findIndex(
        (juego) => juego.codigo === codigoJuego
      );
      listaJuegos.splice(posicionJuego, 1);
      //actualizar el localstorage
      guardarEnLocalstorage();
      //borrar la fila de la tabla
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
