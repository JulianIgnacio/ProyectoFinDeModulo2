import Juego from './classJuego.js';
import { sumarioValidacionJuego } from './validacionJuego.js';

//variables globales
let listaJuegos = JSON.parse(localStorage.getItem('listaJuegos')) || [];
//saber si el array esta no vacio
if (listaJuegos.length !== 0) {
  //objecto Juego
  listaJuegos = listaJuegos.map(
    (juego) =>
      new Juego(
        juego.nombre,
        juego.precio,
        juego.categoria,
        juego.descripcion,
        juego.imagen,
        juego.requisitosSistema,
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
  requisitosSistema = document.getElementById('requisitosSistema'),
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
    escrituraInput(requisitosSistema);
    escrituraInput(desarrollador);
    //volver a mostrar el boton Enviar
    let btnFormulario = document.getElementById('btnFormulario');
    btnFormulario.style.display = 'block';
  });

cargaInicial();

function cargaInicial() {
  if (listaJuegos.length > 0) {
    //dibujo una fila en la tabla
    listaJuegos.map((juego) => crearFila(juego));
  } else {
    let articleJuego = document.querySelector('#articleJuego');
    articleJuego.innerHTML =
      '<h2 class="mt-3 text-center">No hay juegos disponibles</h2>';
  }
}

function crearFila(juego) {
  let tbody = document.querySelector('#tablaJuego');
  if (tbody !== null) {
    tbody.innerHTML += `<tr>
  <td scope="col">1</td>
  <td>${juego.nombre}</td>
  <td>
    ${juego.precio}
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
    <button class="btn btn-danger">
    <i class="bi bi-x-lg"></i>
    </button>
  </td>
</tr>`;
  } else {
    setTimeout(location.reload(), 2500);
  }
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
    requisitosSistema,
    desarrollador
  );

  if (validado === true) {
    // los datos son validos
    //se crea el objeto
    const juegoNuevo = new Juego(
      nombre.value,
      precio.value,
      categoria.value,
      descripcion.value,
      imagen.value,
      requisitosSistema.value,
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
  requisitosSistema.value = juegoBuscado.requisitosSistema;
  soloLecturaInput(requisitosSistema);
  desarrollador.value = juegoBuscado.desarrollador;
  soloLecturaInput(desarrollador);
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
