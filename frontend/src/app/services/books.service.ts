import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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

@Injectable({ providedIn: 'root' })
export class BooksService {
  private base = 'https://angular-bookstore.onrender.com/api/books';

  constructor(private http: HttpClient) {}

  list(page = 0, limit = 10, search = '', category = ''): Observable<any> {
    let params = new HttpParams().set('page', String(page)).set('limit', String(limit));
    if (search)   params = params.set('search', search);
    if (category) params = params.set('category', category);
    return this.http.get<any>(this.base, { params });
  }

  /** Works with either _id OR slug */
  getOne(idOrSlug: string): Observable<Book> {
    return this.http.get<Book>(`${this.base}/${encodeURIComponent(idOrSlug)}`);
  }

  // (optional helpers if you like these names)
  getById(id: string)   { return this.getOne(id); }
  getBySlug(slug: string) { return this.getOne(slug); }

  create(book: Partial<Book>) { return this.http.post<Book>(this.base, book); }
  update(id: string, payload: Partial<Book>) { return this.http.put<Book>(`${this.base}/${id}`, payload); }
  delete(id: string) { return this.http.delete(`${this.base}/${id}`); }
}
