const parametroCodigo = new URLSearchParams(window.location.search);

let listaJuegos = JSON.parse(localStorage.getItem('listaJuegos')) || [];

const peliculaBuscada = listaJuegos.find((juego)=> juego.codigo === parametroCodigo.get('codigo'));