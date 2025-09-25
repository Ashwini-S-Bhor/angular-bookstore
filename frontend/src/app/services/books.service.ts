import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Book {
  _id?: string;
  slug?: string;
  title: string;
  author: string;
  image: string;
  category: string;
  rating: number;
  price: number;
  discount?: number;
  stock: number;
  description?: string;
  language?: string;
  year?: number;
  reviews?: any[];
}

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  // Use proxy if you run ng serve with proxy.conf.json
  private base = 'https://angular-bookstore-backend.onrender.com/api/books';

  constructor(private http: HttpClient) {}

  list(page = 0, limit = 10, search = '', category = ''): Observable<any> {
    const params: any = { page: String(page), limit: String(limit) };
    if (search) params.search = search;
    if (category) params.category = category;
    return this.http.get<any>(this.base, { params });
  }

  getBySlug(slug: string) {
    return this.http.get<Book>(`${this.base}/${slug}`);
  }

  create(book: Partial<Book>) {
    return this.http.post<Book>(this.base, book);
  }

  update(id: string, payload: Partial<Book>) {
    return this.http.put<Book>(`${this.base}/${id}`, payload);
  }

  delete(id: string) {
    return this.http.delete(`${this.base}/${id}`);
  }
}
