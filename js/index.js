let arrayListadoJuegos = Array.from(
  document.getElementsByClassName('card-container')
);
let formBuscador = document.querySelector('#formBuscador');
let buscador = document.querySelector('#buscador');
let listadoJuegos = document.getElementById('listadoJuegos');

let sectionPrincipal = document.getElementById('sectionPrincipal');
let respaldoListadoJuegos = document.createDocumentFragment();

formBuscador.addEventListener('submit', function (e) {
  e.preventDefault();
  let inputBuscador = buscador.value.toLowerCase();
  let titulo, descripcion, filtrar;

  while (listadoJuegos.firstChild) {
    respaldoListadoJuegos.appendChild(listadoJuegos.firstChild);
  }
  if (inputBuscador !== '') {
    filtrar = arrayListadoJuegos.filter((juego) => {
      titulo = juego.querySelector('.card-title').innerHTML.toLowerCase();
      descripcion = juego.querySelector('.card-text').innerHTML.toLowerCase();
      return (
        titulo.includes(inputBuscador) || descripcion.includes(inputBuscador)
      );
    });

    mostrarBannerCarrousel(false);
    filtrar.forEach((juego) => {
      if (filtrar.includes(juego)) {
        listadoJuegos.append(juego);
      }
    });
    if (filtrar.length === 0) mostrarMensaje();
  } else {
    mostrarArrayJuegos();
    mostrarBannerCarrousel(true);
  }
});

function mostrarBannerCarrousel(show) {
  if (show) {
    document
      .getElementById('carouselExampleIndicators')
      .classList.remove('d-none');
    document.getElementById('textoTitulo').innerHTML = 'JUEGOS DESTACADOS';
  } else {
    document
      .getElementById('carouselExampleIndicators')
      .classList.add('d-none');
    document.getElementById('textoTitulo').innerHTML =
      'RESULTADOS DE LA BÚSQUEDA:';
  }
}

function mostrarArrayJuegos() {
  arrayListadoJuegos.forEach((juego) => {
    listadoJuegos.appendChild(juego);
  });
}

function mostrarMensaje() {
  let div = document.createElement('div');

  div.innerHTML = `
              <div class="col">
                      <div class="text-bg-danger h-100">
                              <h3 class="card-title">
                              No se encontraron Juegos según la búsqueda realizada.
                              </h3>
                      </div>
              </div>
      `;

  listadoJuegos.appendChild(div);
}
