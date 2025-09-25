import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CartItem {
  title: string;
  author?: string;
  price: number;
  quantity: number;
  image?: string;
  category?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartHttpService {
  private base =  'https://angular-bookstore.onrender.com/api/cart';


  constructor(private http: HttpClient) {}

  // get cart for userId
  getCart(userId: string): Observable<any> {
    return this.http.get(`${this.base}/${userId}`);
  }

  // add item (or increment)
  addItem(userId: string, item: Partial<CartItem>): Observable<any> {
    return this.http.post(`${this.base}/${userId}/items`, item);
  }

  // update quantity or set absolute quantity
  updateItem(userId: string, payload: { title: string; change?: number; quantity?: number }) {
    return this.http.patch(`${this.base}/${userId}/items`, payload);
  }

  
  removeItem(userId: string, title: string) {
    return this.http.request('delete', `${this.base}/${userId}/items`, { body: { title }});
  }

  
  clearCart(userId: string) {
    return this.http.delete(`${this.base}/${userId}`);
  }

  
  listAll(): Observable<any> {
    return this.http.get(`${this.base}`);
  }
}
