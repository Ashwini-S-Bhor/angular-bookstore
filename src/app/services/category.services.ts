import { Injectable } from '@angular/core';

export interface Category {
  title: string;
  route: string;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categories: Category[] = [
    { title: 'Self-help (on sale)', route: '/books/Self-help', image: './self.webp' },
    { title: 'New Arrivals', route: '/books/NewArrivals', image: './arrivals.webp' },
    { title: 'Business', route: '/books/Business', image: './business.webp' },
    { title: 'Kids', route: '/books/Kids', image: './kida.jpg' },
    { title: 'Novel', route: '/books/Novel', image: './Novel.png' },
    { title: 'Thriller', route: '/books/Thriller', image: './Thriller.png' },
    { title: 'Science', route: '/books/Science', image: './atom.webp' },
    { title: 'Comics', route: '/books/Comics', image: './comic.webp' },
    { title: 'Trading', route: '/books/Trading', image: './trading.webp' },
    { title: 'Spirituality', route: '/books/Spirituality', image: './chakras.webp' },
    { title: 'Fiction', route: '/books/Fiction', image: './fiction.webp' },
    { title: 'Poetry', route: '/books/Poetry', image: './Poetry.png' },
    { title: 'Mythology', route: '/books/Mythology', image: './mythology.webp' }
  ];

  getCategories(): Category[] {
    return this.categories;
  }
}
