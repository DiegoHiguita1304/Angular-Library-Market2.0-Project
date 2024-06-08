import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../models/book.model';
import { BookView } from '../models/bookView.model';






@Injectable({
  providedIn: 'root'
})
export class BookService {

private http = inject(HttpClient)

getAllBooks(){
  return this.http.get<Book[]>('/Libreria-Market/api/books/all')
}

viewBooks(){
  return this.http.get<BookView[]>('/Libreria-Market/api/bookview/all')
}



  
}


