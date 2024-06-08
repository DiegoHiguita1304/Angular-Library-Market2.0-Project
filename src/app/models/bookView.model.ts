export interface BookView {
    nombre: string;
    titulo: string;
    categorias_nombre: string;
    precio: number
    imagen: string;
  }
  export interface Book {
    id: number;
    nombre: string;
    titulo: string;
    categorias_nombre: string;
    precio: number;
    imagen: string; // Nueva propiedad para la URL de la imagen
  }
  