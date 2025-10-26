// import { bootstrapApplication } from '@angular/platform-browser';
// import { provideAnimations } from '@angular/platform-browser/animations';
// import { AppComponent } from './app/app.component';



// bootstrapApplication(AppComponent, {
//   providers: [provideAnimations()]  // Animation ko add kiya gaya hai
// })
//   .catch((err) => console.error(err));



import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';  // Ye jisme animation + router dono ka setup hoga

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));



