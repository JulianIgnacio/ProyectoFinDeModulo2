//variables globales
let listaJuegos = JSON.parse(localStorage.getItem('listaJuegos')) || [];

cargaInicial();

function cargaInicial() {
  if (listaJuegos.length > 0) {
    listaJuegos.map((juego) => crearCard(juego));
  }
}

function crearCard(juego) {
  let sectionCards = document.querySelector('#listadoJuegos');
  sectionCards.innerHTML += `
<div class="col card-container">
    <div class="card h-100">
    <img
        src="${juego.imagen}"
        class="card-img-top"
        alt="${juego.nombre}"
    />
    <div class="card-body">
        <h5 class="card-title fw-bold text-light p-1">
        ${juego.nombre}
        </h5>

        <div class="line-clamp">
        <p class="card-text">
            ${juego.descripcion}
        </p>
        </div>
    </div>
    <div
        class="d-flex justify-content-around flex-grow align-items-baseline text-light"
    >
        <p class="badge rounded-pill text-bg-dark card-text fs-6 text-uppercase">
        ${juego.categoria}
        </p>
        <p class="fw-bold fs-3">$ ${juego.precio}</p>
    </div>
    <a
        class="badge badge-primary text-light m-3 text-start hover-mas-informacion"
        onclick="navegarDetalleJuego('${juego.codigo}')"
        >Más información</a
    >
    </div>
</div>
`;
}

function navegarDetalleJuego(codigo) {
  window.location.href =
    window.location.origin + '/pages/detalle.html?codigo=' + codigo;
}
