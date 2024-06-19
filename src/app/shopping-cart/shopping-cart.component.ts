
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
    items: any[] = []; // Aquí almacenarás los libros agregados al carrito
    shipping: number = 10; // Costo de envío (puedes cambiarlo según tu aplicación)
  
    constructor(private cartService: CartService) {
      this.items = this.cartService.getItems(); // Obtener los ítems del servicio de carrito al inicializar el componente
    }

  removeFromCart(item: any): void {
    this.cartService.removeFromCart(item); // Llamar al método para eliminar un ítem del carrito en el servicio
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
    // Implementar aquí la lógica para procesar el checkout, como enviar los datos del pago a un servicio
    // Por ejemplo, aquí podrías llamar a un servicio de pago para realizar la transacción
    console.log('Proceeding to checkout...');
  }
}

@NgModule({
  declarations: [ShoppingCartComponent],
  imports: [CommonModule, FormsModule], // Añade FormsModule aquí para usar ngModel
  exports: [ShoppingCartComponent]
})
export class ShoppingCartModule {} // Exporta el módulo si es necesario
