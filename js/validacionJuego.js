function validarCantidadCaracteres(texto, min, max) {
  if (texto.value.length >= min && texto.value.length <= max) {
    texto.className = 'form-control is-valid';
    return true;
  } else {
    texto.className = 'form-control is-invalid';
    return false;
  }
}

function validarURLImagen(imagen) {
  let patron = /^(http(s?):)([/|.|\w|\s|-])*\.(?:png|jpe?g|gif|svg)$/;
  if (patron.test(imagen.value)) {
    imagen.className = 'form-control is-valid';
    return true;
  } else {
    imagen.className = 'form-control is-invalid';
    return false;
  }
}

function validarCategoria(categoria) {
  if (
    categoria.value === 'sandbox' ||
    categoria.value === 'simulacion' ||
    categoria.value === 'fabricacion' ||
    categoria.value === 'construccion' ||
    categoria.value === 'aventura' ||
    categoria.value === 'accion'
  ) {
    categoria.className = 'form-select is-valid';
    return true;
  } else {
    categoria.className = 'form-select is-invalid';
    return false;
  }
}

export function sumarioValidacionJuego(
  nombre,
  precio,
  categoria,
  descripcion,
  imagen,
  requisitosSistema,
  desarrollador
) {
  let validado = true;
  if (!validarCantidadCaracteres(nombre, 2, 100)) {
    validado = false;
  }
  if (!validarCantidadCaracteres(precio, 1, 10)) {
    validado = false;
  }
  if (!validarCategoria(categoria)) {
    validado = false;
  }
  if (!validarCantidadCaracteres(categoria, 2, 50)) {
    validado = false;
  }

  if (!validarCantidadCaracteres(descripcion, 2, 200)) {
    validado = false;
  }
  if (!validarURLImagen(imagen)) {
    validado = false;
  }
  if (!validarCantidadCaracteres(requisitosSistema, 2, 500)) {
    validado = false;
  }
  if (!validarCantidadCaracteres(desarrollador, 2, 60)) {
    validado = false;
  }

  return validado;
}
