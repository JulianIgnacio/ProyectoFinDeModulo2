const parametroCodigo = new URLSearchParams(window.location.search);

let listaJuegos = JSON.parse(localStorage.getItem('listaJuegos')) || [];