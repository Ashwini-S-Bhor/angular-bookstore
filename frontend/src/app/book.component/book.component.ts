import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

import { CartService } from '../services/cart';                      
import { CartHttpService } from '../services/cart-http.service';     
import { BooksService } from '../services/books.service';            
import { CategoryService, Category } from '../services/category.services';
import { BannerCarouselComponent } from '../banner/banner';
import { AuthorSectionComponent } from '../author/author';
import { FilterByCategoryPipe } from '../pipes/filter-by-category.pipe';

interface Book {
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
  description: string;
  language: string;
  year: number;
  reviews: { user: string; comment: string; rating: number }[];
}

function getOrCreateGuestId(): string {
  const key = 'guest_cart_id';
  let id = localStorage.getItem(key);
  if (!id) {
    id = 'guest-' + Math.random().toString(36).slice(2, 10);
    localStorage.setItem(key, id);
  }
  return id;
}

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    RouterModule,
    BannerCarouselComponent,
    AuthorSectionComponent,
    CarouselModule,
    FilterByCategoryPipe
  ],
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
export class BookComponent implements OnInit, OnDestroy {
  search = '';
  selectedCategory: string | null = null;
  currentPage = 0;
  booksPerPage = 8;

  books: Book[] = [];
  totalBooks = 0;
  categories: Category[] = [];

  private destroy$ = new Subject<void>();
  private guestId = getOrCreateGuestId();

  carouselOptions: OwlOptions = {
    loop: true,
    margin: 16,
    nav: true,
    dots: false,
    responsive: {
      0: { items: 1 },
      600: { items: 2 },
      900: { items: 3 },
      1200: { items: 5 }
    }
  };

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private cartHttp: CartHttpService,
    private booksService: BooksService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit() {
     this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe(params => {
      this.selectedCategory = params.get('category');
      this.currentPage = 0;
      this.loadBooks();
    });

      const maybeObs = (this.categoryService.getCategories() as any);
    if (maybeObs?.subscribe) {
      maybeObs.pipe(takeUntil(this.destroy$)).subscribe((cats: Category[]) => this.categories = cats);
    } else {
      this.categories = maybeObs || [];
    }

     this.loadBooks();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadBooks(page = this.currentPage) {
    const limit = this.booksPerPage;
    const search = this.search || '';
    const category = this.selectedCategory || '';
    this.booksService.list(page, limit, search, category)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: any) => {
          this.books = res.books || [];
          this.totalBooks = typeof res.total === 'number' ? res.total : this.books.length;
        },
        error: (err) => {
          console.error('Failed to load books', err);
        }
      });
  }

  get topCategories(): Category[] {
    return this.categories.slice(0, 5);
  }

  get nextCategories(): Category[] {
    return this.categories.slice(5, 10);
  }

  selectCategory(cat: string | null) {
    this.selectedCategory = cat;
    this.currentPage = 0;
    this.loadBooks();
  }

  nextPage() {
    if ((this.currentPage + 1) * this.booksPerPage < this.totalBooks) {
      this.currentPage++;
      this.loadBooks(this.currentPage);
    }
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadBooks(this.currentPage);
    }
  }

  openBookDetails(book: Book) {
    const slug = book.slug || book.title.toLowerCase().replace(/\s+/g, '-');
    this.router.navigate(['/book', slug]);
  }

  addToCart(book: Book) {
    const item = {
      title: book.title,
      author: book.author,
      price: book.price,
      image: book.image,
      category: book.category,
      quantity: 1
    };

     this.cartService.addToCart(item as any);

     this.cartHttp.addItem(this.guestId, item).pipe(takeUntil(this.destroy$)).subscribe({
      next: (serverCart: any) => {
         if (serverCart && Array.isArray(serverCart.items)) {
          this.cartService.clearCart();
          serverCart.items.forEach((si: any) => {
            const qty = Math.max(0, Math.floor(si.quantity || 1));
            for (let i = 0; i < qty; i++) {
              this.cartService.addToCart({
                title: si.title,
                author: si.author,
                price: si.price,
                quantity: 1,
                image: si.image,
                category: si.category
              } as any);
            }
          });
        }
      },
      error: (err) => {
        console.error('Failed to persist cart:', err);
        
        this.cartService.updateQuantity(item.title, -1);
        alert('Could not add to cart — please try again.');
      }
    });
  }

  viewAllCategories() {
    this.router.navigate(['/categories']);
  }
}
