import { Component, inject, OnInit } from '@angular/core';
import { BookService } from '../../../../services/book.service';
import { BookView } from '../../../../models/bookView.model';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filtered-books-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filtered-books.component.html',
  styleUrls: ['./filtered-books.component.css']
})
export class FilteredBooksComponent implements OnInit {

  private router = inject(Router);
  searchText: string = '';
  dropdownOpen: boolean = false;
  categories: string[] = ['Terror', 'Ciencia Ficción', 'Cronica', 'Novela', 'Misterio'];
  books: BookView[] = [];
  filteredBooks: BookView[] = [];
  category: string = '';
  cartService: any;

  constructor(private bookService: BookService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.category = params.get('category') || '';
      this.getBooks();
    });
  }

  getBooks() {
    this.bookService.viewBooks().subscribe(books => {
      this.books = books;
      this.filterBooks();
    }, error => {
      console.error('Error fetching books', error);
    });
  }

  filterBooks() {
    if (this.category) {
      this.filteredBooks = this.books.filter(book => book.categorias_nombre === this.category);
    } else {
      this.filteredBooks = this.books;
    }
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectCategory(category: string) {
    this.category = category;
    this.filterBooks();
  }

  addToCart(event: Event, book: BookView): void {
    event.preventDefault();  // Prevenir el comportamiento por defecto del botón
    this.cartService.addToCart(book);
    console.log(`Libro añadido al carrito: ${book.titulo}`);
    
    // Redirigir a la página del carrito después de agregar al carrito
    this.router.navigate(['/shoppingCart']);
  }

  onSearch(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchText = target.value;
    this.filteredBooks = this.books.filter(book =>
      book.titulo.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  onSearchButton() {
    this.filteredBooks = this.books.filter(book =>
      book.titulo.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}
