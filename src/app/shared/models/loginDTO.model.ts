// file per la definizione del modello di dati per il login, che include le proprietà username e pw (password) utilizzate per l'autenticazione dell'utente

// dati da inviare al backend per l'autenticazione dell'utente
export interface LoginDTO { 
    username: string;
    pw: string;
}

// struttura dell'Utente restituito dal backend
export interface UserProfile { // userProfile è un'interfaccia che rappresenta il profilo di un utente autenticato, con proprietà come id, username, email e token di autenticazione
    username: string; 
    email: string;
    ruolo: string;
}

// risposta completa del backend per la richiesta di login, che include un flag di successo, un messaggio e i dati dell'utente autenticato
export interface LoginResponse {
    success: boolean;
    accessToken: string;
    refreshToken: string;
    user: UserProfile;
}


