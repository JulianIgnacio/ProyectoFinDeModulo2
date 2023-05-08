export default class Usuario {
  #codigo;
  #nombre;
  #apellido;
  #correoElectronico;
  #contrasenia;
  #rol;

  constructor(nombre, apellido, correoElectronico, contrasenia, rol) {
    this.#codigo = uuidv4();
    this.#nombre = nombre;
    this.#apellido = apellido;
    this.#correoElectronico = correoElectronico;
    this.#contrasenia = contrasenia;
    this.#rol = rol; //Admin o User
  }

  get codigo() {
    return this.#codigo;
  }

  set codigo(codigo) {
    this.#codigo = codigo;
  }

  get nombre() {
    return this.#nombre;
  }

  set nombre(nombre) {
    this.#nombre = nombre;
  }

  get apellido() {
    return this.#apellido;
  }

  set apellido(apellido) {
    this.#apellido = apellido;
  }

  get correoElectronico() {
    return this.#correoElectronico;
  }

  set correoElectronico(correoElectronico) {
    this.#correoElectronico = correoElectronico;
  }

  get contrasenia() {
    return this.#contrasenia;
  }

  set contrasenia(contrasenia) {
    this.#contrasenia = contrasenia;
  }

  get rol() {
    return this.#rol;
  }

  set rol(rol) {
    this.#rol = rol;
  }

  toJSON() {
    return {
      codigo: this.codigo,
      nombre: this.nombre,
      apellido: this.apellido,
      correoElectronico: this.correoElectronico,
      contrasenia: this.contrasenia,
      rol: this.rol,
    };
  }
}
