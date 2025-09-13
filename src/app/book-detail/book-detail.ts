import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CartService } from '../services/cart';
import { BookComponent } from '../book.component/book.component'; // to access books

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule],
  templateUrl: './book-detail.html',
  styleUrls: ['./book-detail.scss']
})
export class BookDetailsComponent implements OnInit {
  book: any = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      
      const allBooks = new BookComponent(
        this.route,
        this.cartService,
        { getCategories: () => [] } as any,
        this.router
      ).books;

      this.book = allBooks.find(
        b => b.title.toLowerCase().replace(/\s+/g, '-') === slug
      );
    }
  }

  addToCart() {
    if (!this.book) return;
    this.cartService.addToCart({
      title: this.book.title,
      author: this.book.author,
      image: this.book.image,
      category: this.book.category,
      price: this.book.price,
      quantity: 1
    });
    alert(`${this.book.title} added to cart!`);
  }
}
