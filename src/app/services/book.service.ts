import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book, BookView } from '../models/bookView.model';


@Injectable({
  providedIn: 'root'
})
export class BookService {
getBooksByCategory(category: string) {
  throw new Error('Method not implemented.');
  
}
addToCart(bookId: string) {
  throw new Error('Method not implemented.');
}

private http = inject(HttpClient)

// getAllBooks(){
//   return this.http.get<BookView[]>('/Libreria-Market/api/books/all')
// }

getAllBooks(){
  return this.http.get<BookView[]>('/Libreria-Market/api/bookview/all')
}

viewBooks(){
  return this.http.get<BookView[]>('/Libreria-Market/api/bookview/all')
}

  
}


