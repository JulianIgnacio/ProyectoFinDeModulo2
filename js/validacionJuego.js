function validarCantidadCaracteres(texto, min, max) {
  if (texto.length >= min && texto.length <= max) {
    console.log('dato correcto');
    return true;
  } else {
    console.log('dato erroneo');
    return false;
  }
}

function validarURLImagen(imagen) {
  let patron = /^(http(s?):)([/|.|\w|\s|-])*\.(?:png|jpe?g|gif|svg)$/;
  if (patron.test(imagen)) {
    console.log('la expresion regular de la imagen funciona');
    return true;
  } else {
    console.log('la expresion regular de la imagen fallo');
    return false;
  }
}

export function sumarioValidacionJuego(
  nombre,
  precio,
  categoria,
  stock,
  descripcion,
  imagen,
  requisitosSistema,
  desarrollador
) {
  let resumen = '';
  if (!validarCantidadCaracteres(nombre, 5, 100)) {
    resumen += 'El nombre del Juego debe tener entre 5 y 100 caracteres <br>';
  }
  if (!validarCantidadCaracteres(precio, 1, 10)) {
    resumen += 'El precio del Juego debe tener entre 1 y 10 caracteres <br>';
  }
  if (!validarCantidadCaracteres(categoria, 2, 50)) {
    resumen += 'La categoría del Juego debe tener entre 2 y 50 caracteres <br>';
  }
  if (!validarCantidadCaracteres(stock, 1, 10)) {
    resumen += 'El stock debe tener entre 1 y 10 caracteres <br>';
  }
  if (!validarCantidadCaracteres(descripcion, 2, 200)) {
    resumen += 'La descripción debe tener entre 2 y 200 caracteres <br>';
  }
  if (!validarURLImagen(imagen)) {
    resumen +=
      'La imagen del juego debe ser una URL valida terminada en (.jpg, .jpeg, .png, .svg o .gif) <br>';
  }
  if (!validarCantidadCaracteres(requisitosSistema, 2, 500)) {
    resumen += 'La descripción debe tener entre 2 y 500 caracteres <br>';
  }
  if (!validarCantidadCaracteres(desarrollador, 2, 60)) {
    resumen += 'La descripción debe tener entre 2 y 60 caracteres <br>';
  }

  return resumen;
}
