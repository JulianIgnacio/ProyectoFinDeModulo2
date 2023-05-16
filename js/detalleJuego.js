const parametroCodigo = new URLSearchParams(window.location.search);

let listaJuegos = JSON.parse(localStorage.getItem('listaJuegos')) || [];

const juegoBuscado = listaJuegos.find((juego)=> juego.codigo === parametroCodigo.get('codigo'));

let seccion1 = document.getElementById('presentacion');

seccion1.innerHTML =`
<div class="row">
<aside class="container-fluid h-25 w-75" id="sliderDetalle">
  <div id="carouselExample" class="carousel slide">
    <div class="carousel-inner ">
      <div class="carousel-item active">
        <img src="${juegoBuscado.imagen}" class="d-block w-100" alt="${juegoBuscado.nombre}">
      </div>
      <div class="carousel-item">
        <img src="" class="d-block w-100" alt="...">
      </div>
      <div class="carousel-item">
        <img src="" class="d-block w-100" alt="...">
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
<aside class="container-fluid col">
    <p>${juegoBuscado.nombre}</p>
    <p>${juegoBuscado.precio}</p>
    <p>${juegoBuscado.categoria}</p>
    <p>${juegoBuscado.codigo}</p>
    <p>${juegoBuscado.desarrollador}</p>
  </aside>
</div>`

let seccion2 = document.getElementById('descripcion');
seccion2.innerHTML =`
<h4>Descripcion</h4>
<hr>
<p>${juegoBuscado.descripcion}</p>`

let seccion3 = document.getElementById('requisitos');
seccion3.innerHTML = `
<h5>Requisitos del sistema</h5>
<hr>
<p>
  <a class="btn btn-outline-info" data-bs-toggle="collapse" href="#multiCollapseExample1" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">Windows</a>
  <button class="btn btn-outline-info" type="button" data-bs-toggle="collapse" data-bs-target="#multiCollapseExample1" aria-expanded="false" aria-controls="multiCollapseExample1">macOS</button>
</p>
<div class="row" id="columnas">
  <div class="col-6">
    <div class="collapse multi-collapse" id="multiCollapseExample1">
      <div class="card card-body">
        <ul>
          MÍNIMO:
         <li>Procesador: ${juegoBuscado.requisitosProcesador}</li>
         <li>Memoria: ${juegoBuscado.requisitosMemoriaram} </li>
         <li>Gráficos: ${juegoBuscado.requisitosTarjetagrafica}</li>
         <li>Almacenamiento: ${juegoBuscado.requisitosAlmacenamiento}</li>
       </ul>
      </div>
    </div>
  </div>
</div>`