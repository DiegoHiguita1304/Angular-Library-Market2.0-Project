import { Component, inject, signal } from '@angular/core';
import { BookService } from '../../../services/book.service';
import { Book } from '../../../models/book.model';
import { CommonModule } from '@angular/common';
import { BookView } from '../../../models/bookView.model';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent {
  private bookService = inject(BookService);
  books = signal<Book[]>([]);
  viewBooksAll = signal<BookView[]>([]);
  dropdownOpen: boolean | undefined;
imagenes: any;
product: any;
https: any;

  ngOnInit() {
    this.getAll();
    this.viewBooks();
  }

  getAll() {
    return this.bookService.getAllBooks().subscribe(book => {
      this.books.set(book);
    },error=>{
      'se encontro un error'
    });
  }

  viewBooks() {
    return this.bookService.viewBooks().subscribe(orders => {
      this.viewBooksAll.set(orders);
    },error=>{
      'error al traer la vista'
    });
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  // En tu componente de Angular
addToCartHandler() {
  // Lógica para agregar el libro al carrito
  console.log('Agregar libro al carrito');
}

}
