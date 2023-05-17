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
function validarRequisitosProcesador(requisitosProcesador) {
  if (
    requisitosProcesador.value === 'Pentium 4 a 3 GHz' ||
    requisitosProcesador.value === 'Dual Core a 3GHz' ||
    requisitosProcesador.value === 'I3 a 3GHz' ||
    requisitosProcesador.value === 'Ryzen3 a 3GHz' ||
    requisitosProcesador.value === 'I5 a 3,5GHz' ||
    requisitosProcesador.value === 'Ryzen5 a 3,5GHz' ||
    requisitosProcesador.value === 'I7 a 3,5 GHz' ||
    requisitosProcesador.value === 'Ryzen7 a 3,5GHz' ||
    requisitosProcesador.value === 'I9 a 4,2 GHz' ||
    requisitosProcesador.value === 'Ryzen9 a 4,2GHz'
  ) {
    requisitosProcesador.className = 'form-select is-valid';
    return true;
  } else {
    requisitosProcesador.className = 'form-select is-invalid';
    return false;
  }
}
function validarRequisitosMemoriaRAM(requisitosMemoriaram) {
  if (
    requisitosMemoriaram.value === '1GB' ||
    requisitosMemoriaram.value === '2GB' ||
    requisitosMemoriaram.value === '4GB' ||
    requisitosMemoriaram.value === '8GB' ||
    requisitosMemoriaram.value === '16GB' ||
    requisitosMemoriaram.value === '32GB' ||
    requisitosMemoriaram.value === '64GB' ||
    requisitosMemoriaram.value === '128GB'
  ) {
    requisitosMemoriaram.className = 'form-select is-valid';
    return true;
  } else {
    requisitosMemoriaram.className = 'form-select is-invalid';
    return false;
  }
}
function validarRequisitosAlmacenamiento(requisitosAlmacenamiento) {
  if (
    requisitosAlmacenamiento.value === '1GB' ||
    requisitosAlmacenamiento.value === '2GB' ||
    requisitosAlmacenamiento.value === '5GB' ||
    requisitosAlmacenamiento.value === '7,5GB' ||
    requisitosAlmacenamiento.value === '10GB' ||
    requisitosAlmacenamiento.value === '20GB' ||
    requisitosAlmacenamiento.value === '50GB' ||
    requisitosAlmacenamiento.value === '100GB' ||
    requisitosAlmacenamiento.value === '200GB'
  ) {
    requisitosAlmacenamiento.className = 'form-select is-valid';
    return true;
  } else {
    requisitosAlmacenamiento.className = 'form-select is-invalid';
    return false;
  }
}
function validarRequisitosTarjetaGrafica(requisitosTarjetagrafica) {
  if (
    requisitosTarjetagrafica.value === 'nVidia 7600 (2GB)' ||
    requisitosTarjetagrafica.value === 'Nvidia® GeForce™ GTX 1650 (4GB)' ||
    requisitosTarjetagrafica.value === 'AMD® Radeon™ R9 390X (8GB)' ||
    requisitosTarjetagrafica.value === 'ATI X1600 (2GB)'
  ) {
    requisitosTarjetagrafica.className = 'form-select is-valid';
    return true;
  } else {
    requisitosTarjetagrafica.className = 'form-select is-invalid';
    return false;
  }
}

export function sumarioValidacionJuego(
  nombre,
  precio,
  categoria,
  descripcion,
  imagen,
  requisitosProcesador,
  requisitosMemoriaram,
  requisitosAlmacenamiento,
  requisitosTarjetagrafica,
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

  if (!validarRequisitosProcesador(requisitosProcesador)) {
    validado = false;
  }
  if (!validarRequisitosMemoriaRAM(requisitosMemoriaram)) {
    validado = false;
  }
  if (!validarRequisitosAlmacenamiento(requisitosAlmacenamiento)) {
    validado = false;
  }
  if (!validarRequisitosTarjetaGrafica(requisitosTarjetagrafica)) {
    validado = false;
  }
  if (!validarCantidadCaracteres(desarrollador, 2, 60)) {
    validado = false;
  }

  return validado;
}
