import { Injectable } from '@angular/core';
import { CartService, CartItem } from './cart';
import { CartHttpService } from './cart-http.service';
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartSyncService {
  private guestKey = 'guest_cart_id';
  private userId: string;

  constructor(private local: CartService, private http: CartHttpService) {
    this.userId = this.getOrCreateGuestId();

     this.loadCartFromServer().subscribe({
      next: () => {},
      error: (err) => console.warn('Could not load server cart', err)
    });
  }

  private getOrCreateGuestId(): string {
    let id = localStorage.getItem(this.guestKey);
    if (!id) {
      id = 'guest-' + Math.random().toString(36).slice(2, 10);
      localStorage.setItem(this.guestKey, id);
    }
    return id;
  }

  loadCartFromServer(): Observable<any> {
    return this.http.getCart(this.userId).pipe(
      tap((cart: any) => {
        this.syncLocalWithServer(cart?.items || []);
      }),
      catchError(err => {
        console.warn('loadCartFromServer error', err);
        // swallow error and return null so callers won't crash
        return of(null);
      })
    );
  }

   addToCart(item: Partial<CartItem>): Observable<any> {
    this.local.addToCart(item as CartItem);

    return this.http.addItem(this.userId, item).pipe(
      tap((serverCart: any) => {
        this.syncLocalWithServer(serverCart?.items || []);
      }),
      catchError(err => {
         try {
          if (item.title) this.local.updateQuantity(item.title, -1);
        } catch (e) {
          console.warn('Rollback updateQuantity failed', e);
        }
        return throwError(() => err);
      })
    );
  }
 removeItem(title: string): Observable<any> {
    return this.http.removeItem(this.userId, title).pipe(
      tap((serverCart: any) => {
        this.syncLocalWithServer(serverCart?.items || []);
      }),
      catchError(err => {
        return throwError(() => err);
      })
    );
  }

   updateQuantity(payload: { title: string; change?: number; quantity?: number }): Observable<any> {
    // optimistic local update for 'change'
    if (typeof payload.change === 'number') {
      this.local.updateQuantity(payload.title, payload.change);
    } else if (typeof payload.quantity === 'number') {
      // to set absolute quantity compute diff using snapshot if available
      const snapshot = typeof (this.local as any).getSnapshot === 'function'
        ? (this.local as any).getSnapshot()
        : [];
      const existing = snapshot.find((i: any) => i.title === payload.title);
      const current = existing ? existing.quantity : 0;
      const diff = payload.quantity - current;
      if (diff !== 0) this.local.updateQuantity(payload.title, diff);
    }

    return this.http.updateItem(this.userId, payload).pipe(
      tap((serverCart: any) => this.syncLocalWithServer(serverCart?.items || [])),
      catchError(err => {
           this.loadCartFromServer().subscribe();
        return throwError(() => err);
      })
    );
  }

  clearCart(): Observable<any> {
    return this.http.clearCart(this.userId).pipe(
      tap(() => this.local.clearCart()),
      catchError(err => {
        return throwError(() => err);
      })
    );
  }

   private syncLocalWithServer(items: any[]) {
    try {
      this.local.clearCart();

      for (const si of items) {
        const qty = Math.max(0, Math.floor(si.quantity || 0));
        const cartItem: CartItem = {
          title: si.title,
          author: si.author,
          price: si.price,
          image: si.image,
          category: si.category,
          quantity: 1  };

         for (let i = 0; i < qty; i++) {
          this.local.addToCart(cartItem);
        }
      }
    } catch (err) {
      console.error('syncLocalWithServer failed', err);
    }
  }
}
