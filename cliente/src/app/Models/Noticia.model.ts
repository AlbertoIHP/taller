export class Noticia {
  id: number;
  titular: string;
  entrada: string;
  cuerpo: string;
  imagen: string;
  fecha: string;
  categorias_id: string;
  usuarios_id: string;

  constructor()
  {
  this.id = 0;
  this.titular = "";
  this.entrada = "";
  this.cuerpo = "";
  this.imagen = "";
  this.fecha = "";
  this.categorias_id = "";
  this.usuarios_id = "";
  }
}
