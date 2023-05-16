export function verificarUserAdmin() {
  let div = document.getElementById('opciones_administrador');
  let botonLogin = document.getElementById('botonLogin');

  let listaUsuarios = JSON.parse(localStorage.getItem('listaUsuarios'));
  let user = JSON.parse(sessionStorage.getItem('usuarioLogueado')) || {};
  const usuarioBuscado = listaUsuarios.some(
    (usuario) =>
      usuario.correoElectronico === user.correoElectronico &&
      usuario.contrasenia === user.contrasenia &&
      usuario.rol === 'administrador'
  );
  if (usuarioBuscado) {
    div.style.display = 'flex';
    botonLogin.style.display = 'none';
  } else {
    div.style.display = 'none';
    let webAdminJuegos =
      window.location.origin + '/pages/administracionJuegos.html';
    let webAdminUsuarios =
      window.location.origin + '/pages/administracionUsuarios.html';

    if (
      window.location.href === webAdminJuegos ||
      window.location.href === webAdminUsuarios
    ) {
      document.querySelector('body').innerHTML =
        "<h2 class='text-center'>No tienes los permisos suficientes para ver está página, será direccionado a la página principal</h2>";
      setTimeout(() => {
        window.location.href = window.location.origin;
      }, 3000);
    }
  }
}

export function verificarUserLogged() {
  let user = JSON.parse(sessionStorage.getItem('usuarioLogueado')) || {};
  let div = document.getElementById('opciones_administrador');
  let botonLogin = document.getElementById('botonLogin');
  if (JSON.stringify(user) !== '{}') {
    div.style.display = 'flex';
    botonLogin.style.display = 'none';
  } else {
    div.style.display = 'none';
    botonLogin.style.display = 'flex';
  }
}

export function logout() {
  sessionStorage.removeItem('usuarioLogueado');
  window.location.href = window.location.origin;
  verificarUserLogged();
}
