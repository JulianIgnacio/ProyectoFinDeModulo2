function validarCantidadCaracteres(texto, min, max) {
  if (texto.length >= min && texto.length <= max) {
    console.log('dato correcto');
    return true;
  } else {
    console.log('dato erroneo');
    return false;
  }
}

function validarCorreoElectronico(correo) {
  let patron = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (patron.test(correo)) {
    console.log('la expresion regular del correo funciona');
    return true;
  } else {
    console.log('la expresion regular del correo fallo');
    return false;
  }
}

function existeCorreoElectronico(correo) {
  let listaUsuarios = JSON.parse(localStorage.getItem('listaUsuarios')) || [];
  console.log(listaUsuarios);
  const buscarCorreElectronico = listaUsuarios.some((usuario) => {
    return usuario.correoElectronico === correo;
  });
  return buscarCorreElectronico;
}

function validarRol(rol) {
  if (rol === 'administrador' || rol === 'normal') {
    console.log('El rol es un valor de la lista desplegable');
    return true;
  } else {
    console.log('El rol no es un valor de la lista desplegable');
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
  let resumen = '';
  if (!validarCantidadCaracteres(nombre, 2, 70)) {
    resumen += 'El nombre debe tener entre 2 y 70 caracteres <br>';
  }
  if (!validarCantidadCaracteres(apellido, 2, 70)) {
    resumen += 'El apellido  debe tener entre 2 y 70 caracteres <br>';
  }
  if (!validarCorreoElectronico(correoElectronico)) {
    resumen += 'El correo electrónico no válido <br>';
  }

  if (existeCorreoElectronico(correoElectronico)) {
    resumen += 'Ya existe el correo Electrónico. Intente con otro <br>';
  }
  if (!validarCantidadCaracteres(contrasenia, 4, 100)) {
    resumen += 'La contraseña debe tener entre 4 y 100 caracteres <br>';
  }
  if (!validarRol(rol)) {
    resumen += 'El rol debe ser Administrador o Normal <br>';
  }

  return resumen;
}
