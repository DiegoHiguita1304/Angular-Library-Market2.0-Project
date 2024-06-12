import { Component, inject, signal } from '@angular/core';
import { BookService } from '../../../services/book.service';
import { CommonModule } from '@angular/common';
import { Book, BookView } from '../../../models/bookView.model';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent {
  filterdBooks: any;
addToCart(arg0: number) {
throw new Error('Method not implemented.');
}
  private bookService = inject(BookService);
  private router = inject(Router)
  books = signal<BookView[]>([]);
  // filteredBooks = signal<BookView[]>([]);
  dropdownOpen = false;
  // filter = signal<string>('');
  searchText: string = '';

  categories = ['Terror', 'Ciencia Ficción', 'Cronica', 'Novela', 'Misterio'];

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    return this.bookService.viewBooks().subscribe(book => {
      this.books.set(book);
      this.filterdBooks.set(book);
    }, error => {
      console.error('Error fetching books', error);
    });
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectCategory(category: string): void {
    this.router.navigate(['/books/category', category])
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchText = input.value;
    this.filterBooks();
  }

  onSearchButton(): void {
    this.filterBooks();
  }

  filterBooks(): void {
    const searchText = this.searchText.toLowerCase();
    this.filterdBooks.set(this.books().filter(book =>
      book.titulo.toLowerCase().includes(searchText) ||
      book.nombre.toLowerCase().includes(searchText)
    ));
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



