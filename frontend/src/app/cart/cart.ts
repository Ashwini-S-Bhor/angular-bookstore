import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService, CartItem } from '../services/cart';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.scss']
})
export class CartComponent {
  items: CartItem[] = [];
  totalPrice = 0;

  constructor(private cartService: CartService) {
    this.cartService.cartItems$.subscribe((items: CartItem[]) => {
      this.items = items;
      this.totalPrice = this.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    });
  }

  removeItem(title: string) {
    this.cartService.removeFromCart(title);
  }

  updateQuantity(title: string, change: number) {
    this.cartService.updateQuantity(title, change);
  }
}
