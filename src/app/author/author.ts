import { CommonModule } from '@angular/common';
import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';  

@Component({
  selector: 'app-author-section',
  standalone: true,
  imports: [CommonModule, CarouselModule],  
  templateUrl: './author.html',
  styleUrls: ['./author.scss']
})
export class AuthorSectionComponent implements AfterViewInit {
  @ViewChild('authorSection') authorSection!: ElementRef;
  isVisible = false;

  authors = [
    { name: 'John Green', role: 'Author', image: './john.webp' },
    { name: 'Chitra Banerjee', role: 'Author', image: './chitra.webp' },
    { name: 'Shashi Tharoor', role: 'Author', image: './shashi.webp' },
    { name: 'Agatha Christie', role: 'Author', image: './agatha.webp' },
    { name: 'Kunal Basu', role: 'Author', image: './kunal.webp' },
    { name: 'Jay Shetty', role: 'Author', image: './jay.webp' },
    { name: 'Ruskin Bond', role: 'Author', image: './rruskin.webp' },
    { name: 'Preety Shenoy', role: 'Author', image: './preeti.webp' },
  ];

  customOptions = {
    loop: true,
    margin: 20,
    nav: false,
    dots: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    responsive: {
      0: { items: 1 },
      600: { items: 2 },
      1000: { items: 4 }
    }
  };

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.isVisible = true;
            observer.unobserve(this.authorSection.nativeElement);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(this.authorSection.nativeElement);
  }
}
