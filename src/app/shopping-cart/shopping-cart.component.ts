
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Component, NgModule } from '@angular/core';
import { CartService } from "./../services/Cart.service";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent {
handleClick($event: MouseEvent) {
throw new Error('Method not implemented.');
}
searchText: any;
filteredBooks: any;
book: any;
onSearchButton() {
throw new Error('Method not implemented.');
}
onSearch($event: Event) {
throw new Error('Method not implemented.');
}
selectCategory(_t25: any) {
throw new Error('Method not implemented.');
}
dropdownOpen: any;
categories: any;
toggleDropdown() {
throw new Error('Method not implemented.');
}
    items: any[] = []; // Aquí se almacenan los libros agregados al carrito
    shipping: number = 10; // Costo de envío 
  
    constructor(private cartService: CartService) {
      this.items = this.cartService.getItems(); // Obtener los ítems del servicio de carrito al inicializar el componente
    }

  removeFromCart(item: any): void {
    const index = this.items.indexOf(item);
    this.items.splice(index, 1); // Llamar al método para eliminar un ítem del carrito en el servicio
  }

  increaseQuantity(item: any): void {
    item.quantity++; // Incrementar la cantidad de un ítem en el carrito
  }

  decreaseQuantity(item: any): void {
    if (item.quantity > 1) {
      item.quantity--; // Decrementar la cantidad de un ítem en el carrito
    }
  }

  getSubtotal(): number {
    return this.items.reduce((acc, item) => acc + (item.precio * item.quantity), 0); // Calcular el subtotal del carrito
  }

  getTotal(): number {
    return this.getSubtotal() + this.shipping; // Calcular el total incluyendo el envío
  }

  checkout(): void {
    console.log('Checking out', this.items);
    alert('Procediendo al pago. Cantidad total: ' + this.getTotal());
  }
}

@NgModule({
  declarations: [ShoppingCartComponent],
  imports: [CommonModule, FormsModule], 
  exports: [ShoppingCartComponent]
})
export class ShoppingCartModule {} 
