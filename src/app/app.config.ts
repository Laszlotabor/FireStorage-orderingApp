import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';  // Import Firestore module
import { routes } from './app.routes';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { Enviroments } from '../../environments';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom([
      AngularFireModule.initializeApp(Enviroments.firebaseConfig),
      AngularFireDatabaseModule,
      AngularFirestoreModule
    ]),
  ],
};
