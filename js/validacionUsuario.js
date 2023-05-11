function validarCantidadCaracteres(texto, min, max) {
  if (texto.value.length >= min && texto.value.length <= max) {
    texto.className = 'form-control is-valid';
    return true;
  } else {
    texto.className = 'form-control is-invalid';
    return false;
  }
}

function validarCorreoElectronico(correo) {
  let patron =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (patron.test(correo.value)) {
    correo.className = 'form-control is-valid';
    return true;
  } else {
    correo.className = 'form-control is-invalid';
    return false;
  }
}

function existeCorreoElectronico(correo) {
  let listaUsuarios = JSON.parse(localStorage.getItem('listaUsuarios')) || [];
  let usuarioBuscado = listaUsuarios.some(
    (usuario) => usuario.correoElectronico === correo.value
  );
  if (usuarioBuscado || !validarCantidadCaracteres(correo, 5, 100)) {
    correo.className = 'form-control is-invalid';
    return false;
  } else {
    correo.className = 'form-control is-valid';
    return true;
  }
}

function validarContrasenia(contrasenia) {
  let patron =
    /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/;
  if (patron.test(contrasenia.value)) {
    contrasenia.className = 'form-control is-valid';
    return true;
  } else {
    contrasenia.className = 'form-control is-invalid';
    return false;
  }
}

function validarRol(rol) {
  if (rol.value === 'administrador' || rol.value === 'normal') {
    rol.className = 'form-control is-valid';
    return true;
  } else {
    rol.className = 'form-control is-invalid';
    return false;
  }
}

export function sumarioValidacionUsuario(
  nombre,
  apellido,
  correoElectronico,
  contrasenia,
  rol
) {
  let validado = true;
  if (!validarCantidadCaracteres(nombre, 2, 70)) {
    validado = false;
  }
  if (!validarCantidadCaracteres(apellido, 2, 70)) {
    validado = false;
  }
  if (!validarCorreoElectronico(correoElectronico)) {
    validado = false;
  }
  if (!existeCorreoElectronico(correoElectronico)) {
    validado = false;
  }
  if (!validarCantidadCaracteres(contrasenia, 4, 100)) {
    validado = false;
  }
  if (!validarContrasenia(contrasenia)) {
    validado = false;
  }
  if (!validarRol(rol)) {
    validado = false;
  }

  return validado;
}
