function validarCantidadCaracteres(texto, min, max) {
  if (texto.length >= min && texto.length <= max) {
    console.log('dato correcto');
    return true;
  } else {
    console.log('dato erroneo');
    return false;
  }
}

export function sumarioValidacionJuego(nombre) {
  let resumen = '';
  if (!validarCantidadCaracteres(nombre, 5, 100)) {
    resumen += 'El nombre del Juego debe tener entre 5 y 100 caracteres <br>';
  }

  return resumen;
}
