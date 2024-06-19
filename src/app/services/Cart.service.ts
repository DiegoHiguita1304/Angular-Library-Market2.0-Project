// src/app/services/cart.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BookView } from '../models/bookView.model';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // getItems(): any[] {
  //   throw new Error('Method not implemented.');
  // }
  private items: BookView[] = []; // Array para almacenar los libros en el carrito
  private cartSubject = new BehaviorSubject<BookView[]>([]); // BehaviorSubject para emitir cambios en el carrito

  constructor(private http: HttpClient) {}

  addToCart(book: BookView): void {
    this.items.push(book); // Agregar un libro al carrito
    this.cartSubject.next(this.items); // Emitir el nuevo estado del carrito
    console.log('Carrito actualizado:', this.items);
  }

  removeFromCart(book: BookView): void {
    this.items = this.items.filter(item => item.id_libro !== book.id_libro); // Eliminar un libro del carrito
    this.cartSubject.next(this.items); // Emitir el nuevo estado del carrito
  }

  getItems(): BookView[] {
    return this.items;
  }

  getCart(): Observable<BookView[]> {
    return this.cartSubject.asObservable(); // Obtener una Observable del estado actual del carrito
  }

  clearCart(): void {
    this.items = []; // Vaciar el carrito
    this.cartSubject.next(this.items); // Emitir el nuevo estado del carrito (carrito vacío)
  }
}
