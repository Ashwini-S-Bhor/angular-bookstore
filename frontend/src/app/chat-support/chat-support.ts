import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Message {
  text: string;
  sender: 'user' | 'support';
  time: string;
}

@Component({
  selector: 'app-chat-support',
  templateUrl: './chat-support.html',
  imports:[CommonModule,FormsModule],
  styleUrls: ['./chat-support.scss']
})
export class ChatSupportComponent {
  isOpen = false;
  newMessage = '';
  messages: Message[] = [
    { text: 'Hello 👋 How can we help you today?', sender: 'support', time: '10:30 AM' }
  ];

  toggleChat() {
    this.isOpen = !this.isOpen;
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      this.messages.push({
        text: this.newMessage,
        sender: 'user',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });

      this.newMessage = '';

      
      setTimeout(() => {
        this.messages.push({
          text: 'We will get back to you shortly 📚',
          sender: 'support',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
      }, 1000);
    }
  }
}
