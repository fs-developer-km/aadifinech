// import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
// import { provideRouter } from '@angular/router';

// import { routes } from './app.routes';

// export const appConfig: ApplicationConfig = {
//   providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)]
// };


import { ApplicationConfig } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';  // Aapke routes
import { provideHttpClient } from '@angular/common/http';  // ✅ add this


export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),  // ✅ Animation enable kiya
    provideRouter(routes,  withHashLocation()) ,// ✅ Routing enable ki
    provideHttpClient()  // ✅ This makes HttpClient available globally

    
  ]
};
