import { Component, inject, signal } from '@angular/core';
import { BookService } from '../../../services/book.service';
import { CommonModule } from '@angular/common';
import { Book, BookView } from '../../../models/bookView.model';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent {
addToCart(arg0: any) {
throw new Error('Method not implemented.');
}
  private bookService = inject(BookService);
  books = signal<Book[]>([]);
  viewBooksAll = signal<BookView[]>([]);
  dropdownOpen: boolean | undefined;

  ngOnInit() {
    this.getAll();
    this.viewBooks();
  }

  getAll() {
    return this.bookService.getAllBooks().subscribe(book => {
      this.books.set(book);
    }, error => {
      'se encontro un error'
    });
  }

  viewBooks() {
    this.bookService.viewBooks().pipe(
      tap(orders => {
        this.viewBooksAll.set(orders);
        console.log(this.viewBooksAll);
      }),
      catchError(error => {
        console.error('Error al traer la vista', error);
        return of([]);  // Devuelve un observable vacío o alguna lógica de recuperación
      })
    ).subscribe();

  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  // En tu componente de Angular
  addToCartHandler() {
    // Lógica para agregar el libro al carrito
    console.log('Agregar libro al carrito');
  }

  hideSideMenu = signal(false);
  toogleSideMenu() {
    this.hideSideMenu.update(prevState => !prevState);
  }
  

}



