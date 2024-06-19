import { Component, inject, OnInit } from '@angular/core';
import { BookService } from '../../../services/book.service';
import { CommonModule } from '@angular/common';
import { BookView } from '../../../models/bookView.model';
import { Router } from '@angular/router';
import { CartService } from '../../../services/Cart.service';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  bookForm: FormGroup;
  selectIdBook: number | null = null;
  
  private bookService = inject(BookService);
  private cartService = inject(CartService);
  private router = inject(Router);
  searchText: string = '';
  dropdownOpen = false;
  categories: string[] = ['Terror', 'Ciencia Ficción', 'Cronica', 'Novela', 'Misterio'];
  books: BookView[] = [];
  filteredBooks: BookView[] = [];
  category: string = '';

  constructor(private fb: FormBuilder) {
    this.bookForm = this.fb.group({
      id_libro: [0],
      nombre: [""],
      titulo: [""],
      categorias_nombre: [""],
      precio: [0],
      urls: [""],
      quantity: [0]
    });
  }

  ngOnInit() {
    this.getAllBooks();
  }

  getAllBooks() {
    this.bookService.viewBooks().subscribe(books => {
      this.books = books;
      this.filterBooks();
    }, error => {
      console.error('Error fetching books', error);
    });
  }

  addToCart(event: Event, book: BookView): void {
    event.preventDefault();  // Prevenir el comportamiento por defecto del botón
    this.cartService.addToCart(book);
    console.log(`Libro añadido al carrito: ${book.titulo}`);

    // Redirigir a la página del carrito después de agregar al carrito
    this.router.navigate(['/shoppingCart']);
    
  }
  

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectCategory(category: string): void {
    this.category = category;
    this.filterBooks();
  }

  filterBooks() {
    if (this.category) {
      this.filteredBooks = this.books.filter(book => book.categorias_nombre === this.category);
    } else {
      this.filteredBooks = this.books;
    }
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
