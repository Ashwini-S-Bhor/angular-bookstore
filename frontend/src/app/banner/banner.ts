import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  trigger, style, animate, transition, query, group
} from '@angular/animations';

@Component({
  selector: 'app-banner-carousel',
  standalone: true,
  templateUrl: './banner.html',
  styleUrls: ['./banner.scss'],
  imports: [CommonModule],
  animations: [
    trigger('slideAnimation', [
      transition(':increment', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            width: '100%'
          })
        ], { optional: true }),
        group([
          query(':enter', [
            style({ transform: 'translateX(100%)', opacity: 0 }),
            animate('600ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
          ], { optional: true }),
          query(':leave', [
            style({ transform: 'translateX(0)', opacity: 1 }),
            animate('600ms ease-out', style({ transform: 'translateX(-100%)', opacity: 0 }))
          ], { optional: true })
        ])
      ]),
      transition(':decrement', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            width: '100%'
          })
        ], { optional: true }),
        group([
          query(':enter', [
            style({ transform: 'translateX(-100%)', opacity: 0 }),
            animate('600ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
          ], { optional: true }),
          query(':leave', [
            style({ transform: 'translateX(0)', opacity: 1 }),
            animate('600ms ease-out', style({ transform: 'translateX(100%)', opacity: 0 }))
          ], { optional: true })
        ])
      ])
    ])
  ]
})
export class BannerCarouselComponent {
  currentIndex = 0;
  direction: number = 1; 
  intervalId: any;

  slides = [
    {
      image: './slide1.jpg',
      headline: 'Big Book Sale – Up to 50% Off',
      subtext: 'Grab bestsellers, classics & new releases at unbeatable prices',
      cta: 'Shop Now →'
    },
    {
      image: './cart.jpg',
      headline: '📚 Buy More, Save More!',
      subtext: 'Exclusive bundle offers – stock up your bookshelf today',
      cta: 'Buy Now →'
    },
    {
      image: './tree.jpg',
      headline: 'Find Books That Inspire You',
      subtext: 'From fiction to self-help, science to romance — we’ve got it all',
      cta: 'Explore Categories →'
    }
  ];

  ngOnInit() {
    this.intervalId = setInterval(() => this.nextSlide(), 4000);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  nextSlide() {
    // Ping-pong flow: 1 → 2 → 3 → 2 → 1
    if (this.direction === 1 && this.currentIndex === this.slides.length - 1) {
      this.direction = -1;
    } else if (this.direction === -1 && this.currentIndex === 0) {
      this.direction = 1;
    }
    this.currentIndex += this.direction;
  }

  goToSlide(index: number) {
    this.direction = index > this.currentIndex ? 1 : -1;
    this.currentIndex = index;
  }
}
