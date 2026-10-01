import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthServices } from '../services/auth.services';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthServices);
  const router = inject(Router);
  
  if (authService.isAuthenticated()) {
    return true; // accesso consentito se l'utente è autenticato
  }

  // se l'utente non è autenticato, warn e reindirizza alla pagina di login 
  console.warn('Accesso negato. L\'utente non è autenticato.');
  router.navigate(['/']); // reindirizza alla home
  return false; // accesso negato
};
