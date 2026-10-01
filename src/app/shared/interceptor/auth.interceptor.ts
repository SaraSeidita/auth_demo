// interceptor per aggiungere l'header Authorization con il token di accesso alle richieste HTTP

import { HttpInterceptorFn } from "@angular/common/http";
import { AuthServices } from "../services/auth.services";
import { inject } from "@angular/core";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthServices);
    const token = authService.getToken();

    if (token) { // se il token esiste, clona la richiesta e aggiungi l'header Authorization
        const authReq = req.clone({
            setHeaders: { // aggiungi l'header Authorization con il token
                Authorization: `Bearer ${token}`, // Bearer: schema di autenticazione per i token JWT
            },
        });
        return next(authReq); // passa la richiesta clonata con l'header Authorization al prossimo handler
    }   


    return next(req); // se il token non esiste, passa la richiesta originale senza modifiche
};