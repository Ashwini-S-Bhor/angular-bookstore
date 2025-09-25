import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookComponent } from './book.component';

describe('BookComponent', () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookComponent]   // standalone component
    }).compileComponents();

    fixture = TestBed.createComponent(BookComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the page title using interpolation', () => {
    const heading = compiled.querySelector('h1');
    expect(heading?.textContent).toContain(component.pageTitle);
  });

  it('should render a list of books using @for', () => {
    const cards = compiled.querySelectorAll('.card');
    expect(cards.length).toBe(component.books.length);
  });

  it('should show "No books found" when filtered list is empty (@if else)', () => {
    component.searchText = 'not-existing-book';
    fixture.detectChanges();

    const emptyMsg = compiled.querySelector('.empty');
    expect(emptyMsg?.textContent).toContain('No books found');
  });

  it('should filter books based on search text', () => {
    component.searchText = 'Angular';
    fixture.detectChanges();

    const cards = compiled.querySelectorAll('.card');
    expect(cards.length).toBe(1);
    expect(cards[0].querySelector('h3')?.textContent).toContain('Angular');
  });
});
