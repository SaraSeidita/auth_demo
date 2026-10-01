// modello utente registrazione 

// dati da inviare al backend per l'autenticazione dell'utente
export interface registerDTO { 
    username: string;
    email: string;
    pw: string;
}

export interface RegisterFormModel extends registerDTO {
    confirmPw: string; // aggiunto per la conferma della password
}

// risposta completa del backend per la richiesta di registrazione, che include un flag di successo, un messaggio e i dati dell'utente registrato
export interface RegisterResponse {
    success: boolean;
    idUtente?: number;
    message?: string; // Utile in caso di errore (es. 409 Conflict o 500)
}


