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
