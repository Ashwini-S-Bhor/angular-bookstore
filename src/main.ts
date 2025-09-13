import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { appConfig } from './app/app.config';
import { App } from './app/app';

import { register } from 'swiper/element/bundle';
register();

bootstrapApplication(App, {
  providers: [
    ...appConfig.providers, 
    provideAnimations()      
  ]
})
.catch((err) => console.error(err));
