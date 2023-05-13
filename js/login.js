window.onload = function () {
  document.getElementById("formLogin").addEventListener("submit", login);
};

const administrador = {
  email: "admin@rollingcode.com",
  contrasenia: "1",
};

function esCorreoValido(correo) {
  var regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regexCorreo.test(correo);
}

function esContraseniaValida(contrasenia) {
  var regexContrasenia =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8}$/;
  return regexContrasenia.test(contrasenia);
}

var modalLogin = new bootstrap.Modal(document.getElementById("modalLogin"));

function login(event) {
  event.preventDefault();

  let correoElectronico = document.getElementById("correoElectronico").value;
  let contrasenia = document.getElementById("contrasenia").value;

  var div = document.getElementById("opciones_administrador");
  if (
    correoElectronico === administrador.email &&
    contrasenia === administrador.contrasenia &&
    esCorreoValido(correoElectronico) &&
    esContraseniaValida(contrasenia)
  ) {
    div.style.display = "flex";
  } else {
    div.style.display = "none";
  }
  modalLogin.hide();
}
