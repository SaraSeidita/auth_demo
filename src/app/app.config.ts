import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { authInterceptor } from './shared/interceptor/auth.interceptor';
import { BaseURLIInterceptor } from './shared/interceptor/baseUrl.interceptor';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
     // Attiva il rilevamento dei cambiamenti zoneless (Angular 21+)
    provideZonelessChangeDetection(), 
    
    // Configurazione del Router con binding automatico dei parametri URL ai componenti
    provideRouter(
      routes, 
      withComponentInputBinding() 
    ),

    // Configurazione dell'HTTP Client globale con l'interceptor per il BaseURL
    provideHttpClient(
      withInterceptors([
        BaseURLIInterceptor, // Interceptor per aggiungere il BaseURL alle richieste HTTP
        authInterceptor // Interceptor per aggiungere l'header Authorization con il token di accesso alle richieste HTTP
      ]) ,
    ),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes)
  ]
};
