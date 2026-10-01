import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { environment } from "../../../environments/envitornment";

export const BaseURLIInterceptor: HttpInterceptorFn = (
    req: HttpRequest<unknown>, 
    next: HttpHandlerFn
) => { 

    // prima di aggiungere il baseUrl, controlla se l'url della richiesta inizia con http:// o https://, in tal caso non aggiungere il baseUrl
    if (req.url.startsWith('http://') || req.url.startsWith('https://')) {
        return next(req);
    }

    // aggiungi il baseUrl all'url della richiesta
    const baseUrl = environment.API_BASE_URL.endsWith('/') 
    ? environment.API_BASE_URL
    : environment.API_BASE_URL + '/';
    
    const url = req.url.startsWith('/') ? req.url.substring(1) : req.url;
    const reqClone = req.clone({
        url: baseUrl + url,
    });
    return next(reqClone);
};
