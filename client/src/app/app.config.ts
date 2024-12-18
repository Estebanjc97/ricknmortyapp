import { ApplicationConfig, inject, PLATFORM_ID, provideZoneChangeDetection, REQUEST } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideFirebaseApp, initializeApp, initializeServerApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { isPlatformBrowser } from '@angular/common';

const firebaseConfig = {
  apiKey: "AIzaSyAwL6i1t3wxlrl4AcVbVPmUiqU6MNgjjRI",
  authDomain: "ricknmortyapp-444617.firebaseapp.com",
  projectId: "ricknmortyapp-444617",
  storageBucket: "ricknmortyapp-444617.firebasestorage.app",
  messagingSenderId: "467042232272",
  appId: "1:467042232272:web:73485e02d816fa540a7bd5"
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideClientHydration(withEventReplay()), 
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    provideFirebaseApp(() => {
      if (isPlatformBrowser(inject(PLATFORM_ID))) {
        return initializeApp(firebaseConfig);
      }
      const request = inject(REQUEST, { optional: true });
      const authIdToken = request?.headers.get("Authorization")?.split("Bearer ")[1];
      return initializeServerApp(firebaseConfig, {
        authIdToken,
        releaseOnDeref: request || undefined
      });
    }),
    provideAuth(() => getAuth()),
  ]
};
