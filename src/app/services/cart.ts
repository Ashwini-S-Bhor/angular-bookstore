import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  title: string;
  author: string;
  price: number;
  quantity: number;
  image: string;
  category?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartSubject.asObservable();

  addToCart(book: CartItem) {
    const existing = this.cartItems.find(item => item.title === book.title);
    if (existing) {
      existing.quantity += 1;
    } else {
      this.cartItems.push({ ...book, quantity: 1 });
    }
    this.cartSubject.next([...this.cartItems]); // ✅ emit updated list
  }

  removeFromCart(title: string) {
    this.cartItems = this.cartItems.filter(item => item.title !== title);
    this.cartSubject.next([...this.cartItems]);
  }

  clearCart() {
    this.cartItems = [];
    this.cartSubject.next([]);
  }
  updateQuantity(title: string, change: number) {
  const item = this.cartItems.find(i => i.title === title);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      this.removeFromCart(title);
    } else {
      this.cartSubject.next([...this.cartItems]);
    }
  }
}

}
