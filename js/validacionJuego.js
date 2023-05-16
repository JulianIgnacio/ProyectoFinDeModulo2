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
    requisitosProcesador.value === 'pentium4a3ghz' ||
    requisitosProcesador.value === 'dualcorea3ghz' ||
    requisitosProcesador.value === 'i3a3ghz' ||
    requisitosProcesador.value === 'ryzen3a3ghz' ||
    requisitosProcesador.value === 'i5a35ghz' ||
    requisitosProcesador.value === 'ryzen5a35ghz' ||
    requisitosProcesador.value === 'i7a35ghz' ||
    requisitosProcesador.value === 'ryzen7a35ghz' ||
    requisitosProcesador.value === 'i9a42ghz' ||
    requisitosProcesador.value === 'ryzen9a42ghz'
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
    requisitosMemoriaram.value === '1gbram' ||
    requisitosMemoriaram.value === '2gbram' ||
    requisitosMemoriaram.value === '4gbram' ||
    requisitosMemoriaram.value === '8gbram' ||
    requisitosMemoriaram.value === '16gbram' ||
    requisitosMemoriaram.value === '32gbram' ||
    requisitosMemoriaram.value === '64gbram' ||
    requisitosMemoriaram.value === '128gbram'
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
    requisitosAlmacenamiento.value === '1gbdisco' ||
    requisitosAlmacenamiento.value === '2gbdisco' ||
    requisitosAlmacenamiento.value === '5gbdisco' ||
    requisitosAlmacenamiento.value === '75gbdisco' ||
    requisitosAlmacenamiento.value === '10gbdisco' ||
    requisitosAlmacenamiento.value === '50gbdisco' ||
    requisitosAlmacenamiento.value === '100gbdisco' ||
    requisitosAlmacenamiento.value === '200gbdisco'
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
    requisitosTarjetagrafica.value === 'nvidia7600' ||
    requisitosTarjetagrafica.value === 'gtx1650' ||
    requisitosTarjetagrafica.value === 'radeonr9390x' ||
    requisitosTarjetagrafica.value === 'atix1600'
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
