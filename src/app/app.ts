import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar';
import { CommonModule } from '@angular/common';
import {  FooterComponent } from './footer/footer';
import { ChatSupportComponent } from './chat-support/chat-support';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent,CommonModule,FooterComponent,ChatSupportComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  
  protected readonly title = signal('angular');
  isLoading = signal(true);

  constructor() {
    
    setTimeout(() => {
      this.isLoading.set(false);
    }, 400);
  }
}
