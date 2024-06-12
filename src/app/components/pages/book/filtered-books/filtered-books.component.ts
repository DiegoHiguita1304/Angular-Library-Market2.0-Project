import { Component } from '@angular/core';
import { BookService } from '../../../../services/book.service';
import { BookView } from '../../../../models/bookView.model';
import {ActivatedRoute} from '@angular/router'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filtered-books-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filtered-books.component.html',
  styleUrl: './filtered-books.component.css'
})
export class FilteredBooksComponent {
addToCart(arg0: number) {
throw new Error('Method not implemented.');
}
  // private bookService = inject(BookService);
  // private route = inject(ActivatedRoute);
  books: BookView[] = [];
  filteredBooks: BookView[] = [];
  category: string = '';

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
}

