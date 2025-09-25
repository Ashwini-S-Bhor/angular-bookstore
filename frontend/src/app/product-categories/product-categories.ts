import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { CategoryService } from '../services/category.services';
export interface Category {
  title: string;
  route: string;
  image: string;
}

@Component({
  selector: 'app-product-categories',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    RouterModule
  ],
  templateUrl: './product-categories.html',
  styleUrls: ['./product-categories.scss']
})
export class ProductCategoriesComponent {
  categories = [
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
  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.categories = this.categoryService.getCategories();
  }
}
