export function verificarUser() {
  //let btnLogin = document.getElementById('btnLogin');
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
    //mostrar la opcion de admin en el navbar solo si el usuario que está logueado es admin
    div.style.display = 'flex';
    botonLogin.style.display = 'none';
  } else {
    div.style.display = 'none';
    let webAdmin = window.location.origin + '/pages/administracionJuegos.html';
    //si no está logueado se le muestra un cartel que no tiene los permisos suficientes para ver dicha página.
    if (window.location.href === webAdmin) {
      document.querySelector('body').innerHTML =
        "<h2 class='text-center'>No tienes los permisos suficientes para ver está página, será direccionado a la página principal</h2>";
      setTimeout(() => {
        window.location.href = window.location.origin;
      }, 3000);
    }
  }
}
