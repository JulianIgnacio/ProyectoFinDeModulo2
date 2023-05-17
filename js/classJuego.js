export default class Juego {
  #codigo;
  #nombre;
  #precio;
  #categoria;
  #descripcion;
  #imagen;
  #requisitosProcesador;
  #requisitosMemoriaram;
  #requisitosAlmacenamiento;
  #requisitosTarjetagrafica;
  #desarrollador;
  #reseniaVoto;
  #reseniaDescripcion;

  constructor(
    codigo = uuidv4(),
    nombre,
    precio,
    categoria,
    descripcion,
    imagen,
    requisitosProcesador,
    requisitosMemoriaram,
    requisitosAlmacenamiento,
    requisitosTarjetagrafica,
    desarrollador,
    reseniaVoto,
    reseniaDescripcion
  ) {
    this.#codigo = codigo;
    this.#nombre = nombre;
    this.#precio = precio;
    this.#categoria = categoria;
    this.#descripcion = descripcion;
    this.#imagen = imagen;
    this.#requisitosProcesador = requisitosProcesador;
    this.#requisitosMemoriaram = requisitosMemoriaram;
    this.#requisitosAlmacenamiento = requisitosAlmacenamiento;
    this.#requisitosTarjetagrafica = requisitosTarjetagrafica;
    this.#desarrollador = desarrollador;
    this.#reseniaVoto = reseniaVoto;
    this.#reseniaDescripcion = reseniaDescripcion;
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

  get precio() {
    return this.#precio;
  }

  set precio(precio) {
    this.#precio = precio;
  }

  get categoria() {
    return this.#categoria;
  }

  set categoria(categoria) {
    this.#categoria = categoria;
  }

  get descripcion() {
    return this.#descripcion;
  }

  set descripcion(descripcion) {
    this.#descripcion = descripcion;
  }

  get imagen() {
    return this.#imagen;
  }

  set imagen(imagen) {
    this.#imagen = imagen;
  }

  get requisitosProcesador() {
    return this.#requisitosProcesador;
  }

  set requisitosProcesador(requisitosProcesador) {
    this.#requisitosProcesador = requisitosProcesador;
  }

  get requisitosMemoriaram() {
    return this.#requisitosMemoriaram;
  }

  set requisitosMemoriaram(requisitosMemoriaram) {
    this.#requisitosMemoriaram = requisitosMemoriaram;
  }

  get requisitosAlmacenamiento() {
    return this.#requisitosAlmacenamiento;
  }

  set requisitosAlmacenamiento(requisitosAlmacenamiento) {
    this.#requisitosAlmacenamiento = requisitosAlmacenamiento;
  }

  get requisitosTarjetagrafica() {
    return this.#requisitosTarjetagrafica;
  }

  set requisitosTarjetagrafica(requisitosTarjetagrafica) {
    this.#requisitosTarjetagrafica = requisitosTarjetagrafica;
  }

  get desarrollador() {
    return this.#desarrollador;
  }

  set desarrollador(desarrollador) {
    this.#desarrollador = desarrollador;
  }

  get reseniaVoto() {
    return this.#reseniaVoto;
  }

  set reseniaVoto(reseniaVoto) {
    this.#reseniaVoto = reseniaVoto;
  }

  get reseniaDescripcion() {
    return this.#reseniaDescripcion;
  }

  set reseniaDescripcion(reseniaDescripcion) {
    this.#reseniaDescripcion = reseniaDescripcion;
  }

  toJSON() {
    return {
      codigo: this.codigo,
      nombre: this.nombre,
      precio: this.precio,
      categoria: this.categoria,
      descripcion: this.descripcion,
      imagen: this.imagen,
      requisitosProcesador: this.requisitosProcesador,
      requisitosMemoriaram: this.requisitosMemoriaram,
      requisitosAlmacenamiento: this.#requisitosAlmacenamiento,
      requisitosTarjetagrafica: this.#requisitosTarjetagrafica,
      desarrollador: this.desarrollador,
      reseniaVoto: this.reseniaVoto,
      reseniaDescripcion: this.reseniaDescripcion,
    };
  }
}
