export interface BookView {
    id_libro: number;
    nombre: string;
    titulo: string;
    categorias_nombre: string;
    precio: number;
    urls: string;
  }
  export interface Book {
    id: number;
    nombre: string;
    titulo: string;
    categorias_nombre: string;
    precio: number;
    urls: string; // Nueva propiedad para la URL de la imagen
  }
  