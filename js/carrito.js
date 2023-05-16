const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
// const listadoJuegos = document.querySelector('#listadoJuegos');
const botonVaciarCarrito = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];

//manejador de Eventos
//Cuando agregar un juego presionando "Agregar al Carrito"
listadoJuegos.addEventListener('click', agregarJuegoCarrito);

//Elimina juego del carrito
carrito.addEventListener('click', eliminarJuego);

//Vaciar el carrito
botonVaciarCarrito.addEventListener('click', (e) => {
  e.preventDefault();
  articulosCarrito = []; // resetear el arreglo carrito
  limpiarHTML(); // Se elimina todo el HTML
});

function agregarJuegoCarrito(e) {
  e.preventDefault();

  const juegoSeleccionado = e.target.parentElement.parentElement;
  leerDatosJuegos(juegoSeleccionado);
  console.log(juegoSeleccionado);
}

//Leer el contenido del HTML al que le dimos click y extrae
//la info del juego
function leerDatosJuegos(juego) {
  //Crear un objeto con el contenido de la juego actual
  const infoJuego = {
    imagen: juego.querySelector('img').src,
    nombre: juego.querySelector('.card-title').textContent.trim(),
    precio: juego.querySelector('.precio').textContent,
  };
  //Revisa si un elemento ya existe en el carrito
  console.log('infoJuego', infoJuego);
  const existe = articulosCarrito.some(
    (juego) => juego.nombre === infoJuego.nombre
  );
  console.log(existe);
  if (!existe) {
    //Agrega elementos al arreglo de carrito
    articulosCarrito = [...articulosCarrito, infoJuego];
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Se agregó correctamente al carrito',
      showConfirmButton: false,
      timer: 2000,
    });
  } else {
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: 'Ya existe el juego en el carrito',
      showConfirmButton: false,
      timer: 2000,
    });
  }

  carritoHTML();
}

//Muestra el carrito de compras en el HTML
function carritoHTML() {
  //Limpiar el HTML
  limpiarHTML();

  //Recorre el arreglo del carrito y genera el HTML
  articulosCarrito.forEach((juego) => {
    const { imagen, nombre, precio } = juego;
    const row = document.createElement('tr');
    row.innerHTML = `
              <td>
                  <img src="${imagen}" width="100">
              </td>
              <td class="tamanioCelda text-truncate">
                  ${nombre}
              </td>
              <td>
                   ${precio}
              </td>
              <td>
                  <a href="#" class="borrar-juego"><i class="bi bi-x-circle fs-5 text-danger"></i></a>
              </td>
          `;

    //Agrega el HTML del carrito en el tbody
    contenedorCarrito.appendChild(row);
  });
}

//Elimina los juegos del tbody
function limpiarHTML() {
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}

function eliminarJuego(e) {
  console.log('entro');
  if (e.target.classList.contains('bi-x-circle')) {
    console.log(e.target.parentElement.childNodes);
    // const juegoNombre =
    //   e.target.parentElement.parentElement.children[1].textContent;
    // //Elimina del arrego de articulosCarrito por el titulo del juego
    // articulosCarrito = articulosCarrito.filter(
    //   (juego) => juego.nombre !== juegoNombre.trim()
    // );
    // carritoHTML(); //volvemos a iterar sobre carrito y mostrar su HTML
  }
}
