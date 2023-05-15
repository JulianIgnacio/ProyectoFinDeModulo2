const parametroCodigo = new URLSearchParams(window.location.search);

let listaJuegos = JSON.parse(localStorage.getItem('listaJuegos')) || [];

const juegoBuscado = listaJuegos.find((juego)=> juego.codigo === parametroCodigo.get('codigo'));

let seccion1 = document.getElementById('#presentacion');
seccion.innerHTML = `          <div class="row">
<aside class="container-fluid h-25 w-75" id="sliderDetalle">
  <div id="carouselExample" class="carousel slide">
    <div class="carousel-inner ">
      <div class="carousel-item active">
        <img src="${juegoBuscado.imagen}" class="d-block w-100" alt="${juegoBuscado.titulo}">
      </div>
      <div class="carousel-item">
        <img src="..." class="d-block w-100" alt="...">
      </div>
      <div class="carousel-item">
        <img src="..." class="d-block w-100" alt="...">
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</aside>
<aside class="container-fluid col" >
    <p>${juegoBuscado.titulo}</p>
    <p>${juegoBuscado.precio}</p>
    <p>${juegoBuscado.categoria}</p>
    <p>${juegoBuscado.codigo}</p>
    <p>${juegoBuscado.desarrollador}</p>
  </aside>
</div>`
