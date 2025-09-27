import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CartService } from '../services/cart';
import { BooksService, Book } from '../services/books.service';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule],
  templateUrl: './book-detail.html',
  styleUrls: ['./book-detail.scss'],
})
export class BookDetailsComponent implements OnInit {
  book: Book | null = null;
  loading = false;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService,
    private booksService: BooksService
  ) {}

 
  ngOnInit() {
  const idOrSlug = this.route.snapshot.paramMap.get('slug');
  if (!idOrSlug) { this.error = 'Book not found'; return; }

  this.loading = true;
  this.error = null;

  this.booksService.getOne(idOrSlug).subscribe({
    next: (b) => { this.book = { ...b, reviews: b.reviews ?? [] }; this.loading = false; },
    error: () => { this.error = 'Book not found'; this.loading = false; }
  });
}


  addToCart() {
    if (!this.book) return;
    this.cartService.addToCart({
      title: this.book.title,
      author: this.book.author,
      image: this.book.image,
      category: this.book.category,
      price: this.book.price,
      quantity: 1,
    });
    alert(`${this.book.title} added to cart!`);
  }
}
