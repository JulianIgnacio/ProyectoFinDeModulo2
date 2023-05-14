import Usuario from "./classUsuario.js";

window.onload = function () {
  document.getElementById("formLogin").addEventListener("submit", login);
};

function esCorreoValido(correo) {
  var regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regexCorreo.test(correo);
}

function esContraseniaValida(contrasenia) {
  var regexContrasenia =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  return regexContrasenia.test(contrasenia);
}

var modalLogin = new bootstrap.Modal(document.getElementById("modalLogin"));

function login(event) {
  event.preventDefault();
  let listaUsuarios = JSON.parse(localStorage.getItem("listaUsuarios")) || [];

  if (listaUsuarios.length !== 0) {
    //objecto Usuario
    listaUsuarios = listaUsuarios.map(
      (usuario) =>
        new Usuario(
          usuario.codigo,
          usuario.nombre,
          usuario.apellido,
          usuario.correoElectronico,
          usuario.contrasenia,
          usuario.rol
        )
    );
  }

  let correoElectronico = document.getElementById("correoElectronico");
  let contrasenia = document.getElementById("contrasenia");
  let div = document.getElementById("opciones_administrador");

  let esValidado = listaUsuarios.some(
    (u) =>
      u.correoElectronico === correoElectronico.value &&
      u.contrasenia === contrasenia.value &&
      u.rol === "normal"
  );

  let esValidadoAdministrador = listaUsuarios.some(
    (u) =>
      u.correoElectronico === correoElectronico.value &&
      u.contrasenia === contrasenia.value &&
      u.rol === "administrador"
  );

  // Verificar el correo electrónico
  if (!esCorreoValido(correoElectronico.value)) {
    correoElectronico.classList.add("is-invalid");
  } else {
    correoElectronico.classList.remove("is-invalid");
  }

  // Verificar la contraseña
  if (!esContraseniaValida(contrasenia.value)) {
    contrasenia.classList.add("is-invalid");
  } else {
    contrasenia.classList.remove("is-invalid");
  }

  if (esValidadoAdministrador) {
    div.style.display = "flex";
    modalLogin.hide();
  } else if (esValidado) {
    div.style.display = "none";
    modalLogin.hide();
  } else {
    div.style.display = "none";
    let alertaFormuralio = document.getElementById("alertaFormulario");
    alertaFormuralio.classList.add("d-flex");
    alertaFormuralio.classList.remove("d-none");
  }
}
