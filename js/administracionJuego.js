import Juego from './classJuego.js';

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
        juego.stock,
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
  stock = document.getElementById('stock'),
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

cargaInicial();

function cargaInicial() {
  if (listaJuegos.length > 0) {
    //dibujo una fila en la tabla
    listaJuegos.map((juego) => crearFila(juego));
  }
}

function crearFila(juego) {
  let tbody = document.querySelector('#tablaJuego');
  tbody.innerHTML += `<tr>
  <td scope="col">1</td>
  <td>${juego.nombre}</td>
  <td>
    ${juego.precio}
  </td>
  <td class="tamanioCelda text-truncate">
    ${juego.categoria}
  </td>
  <td>${juego.stock}</td>
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

function prepararFormularioJuego(e) {
  e.preventDefault();
  console.log('aqui creo el juego');
  crearJuego();
}

function crearJuego() {
  //se crea el objeto
  const juegoNuevo = new Juego(
    nombre.value,
    precio.value,
    categoria.value,
    stock.value,
    descripcion.value,
    imagen.value,
    requisitosSistema.value,
    desarrollador.value,
    0, //reseniaVoto
    '' //reseniaDescripcion
  );
  console.log(juegoNuevo);
}

function mostrarFormularioJuego() {
  modalFormJuego.show();
}
