import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BookView } from '../models/bookView.model';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private storageKey = 'shoppingCart';
  private items: BookView[] = [];
  private cartSubject = new BehaviorSubject<BookView[]>(this.loadItems());

  constructor(private http: HttpClient) {
    // Listener to save items to localStorage before the window is unloaded
    window.addEventListener('beforeunload', () => this.saveItems());
  }

  private saveItems() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.items));
  }

  private loadItems(): BookView[] {
    const savedItems = localStorage.getItem(this.storageKey);
    this.items = savedItems ? JSON.parse(savedItems) : [];
    return this.items;
  }

  addToCart(book: BookView): void {
    const existingItem = this.items.find(item => item.id_libro === book.id_libro);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      book.quantity = 1;
      this.items.push(book);
    }
    this.cartSubject.next(this.items); // Emitir el nuevo estado del carrito
    this.saveItems(); // Guardar en localStorage
  }

  removeFromCart(book: BookView): void {
    this.items = this.items.filter(item => item.id_libro !== book.id_libro);
    this.cartSubject.next(this.items); // Emitir el nuevo estado del carrito
    this.saveItems(); // Guardar en localStorage
  }

  increaseQuantity(book: BookView): void {
    const item = this.items.find(item => item.id_libro === book.id_libro);
    if (item) {
      item.quantity++;
      this.cartSubject.next(this.items); // Emitir el nuevo estado del carrito
      this.saveItems(); // Guardar en localStorage
    }
  }

  decreaseQuantity(book: BookView): void {
    const item = this.items.find(item => item.id_libro === book.id_libro);
    if (item && item.quantity > 1) {
      item.quantity--;
      this.cartSubject.next(this.items); // Emitir el nuevo estado del carrito
      this.saveItems(); // Guardar en localStorage
    }
  }

  getItems(): BookView[] {
    return this.items;
  }

  getCart(): Observable<BookView[]> {
    return this.cartSubject.asObservable();
  }

  clearCart(): void {
    this.items = [];
    this.cartSubject.next(this.items); // Emitir el nuevo estado del carrito (carrito vacío)
    this.saveItems(); // Guardar en localStorage
  }
}
