window.onload = function () {
  document.getElementById("formLogin").addEventListener("submit", login);
};

const administrador = {
  email: "admin@rollingcode.com",
  contrasenia: "123456Aa$",
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

  let correoElectronico = document.getElementById("correoElectronico");
  let contrasenia = document.getElementById("contrasenia");
  let div = document.getElementById("opciones_administrador");

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

  if (
    correoElectronico.value === administrador.email &&
    contrasenia.value === administrador.contrasenia
  ) {
    div.style.display = "flex";
    modalLogin.hide();
  } else {
    div.style.display = "none";
    let alertaFormuralio = document.getElementById("alertaFormulario");
    alertaFormuralio.classList.add("d-flex")
    alertaFormuralio.classList.remove("d-none")
    }
}
