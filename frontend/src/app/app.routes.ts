import { Routes } from '@angular/router';
import { BookComponent } from './book.component/book.component';
import { ProductCategoriesComponent } from './product-categories/product-categories';
import { BulkPurchaseComponent } from './bulk-purchase/bulk-purchase';
import { CartComponent } from './cart/cart';
import { BookDetailsComponent } from './book-detail/book-detail';
import { About } from './about/about';
import { ReturnReplacement } from './return-replacement/return-replacement';
import { Contact } from './contact/contact';
import { TermsConditions } from './terms-conditions/terms-conditions';
import { Policy } from './policy/policy';



export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'home', component: BookComponent },
{ path: 'book/:slug', component: BookDetailsComponent },

  { path: 'categories', component: ProductCategoriesComponent },
{ path: 'bulk-purchase', component: BulkPurchaseComponent },
 { path: 'cart', component: CartComponent },
 { path: 'about', component: About },
 { path: 'return-replacement', component: ReturnReplacement },
 { path: 'contact-us', component: Contact },
 { path: 'terms', component: TermsConditions},
 { path: 'policy', component: Policy},
 
  { path: 'books/:category', component: BookComponent },
];
