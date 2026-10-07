import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { LoginDTO, LoginResponse, UserProfile } from '../models/loginDTO.model';
import { Observable, tap } from 'rxjs';
import { registerDTO, RegisterResponse } from '../models/registerDTO.model';
import { UserSaveDTO } from '../models/utente.model';

@Injectable({
  providedIn: 'root',
})

export class AuthServices {
  private _http = inject(HttpClient);


  // per l'url uso l'interceptor baseUrl
  private readonly loginUrl = '/Auth/Login';
  private readonly registerUrl = '/Utente/SalvaUtente';
  private readonly salvaUrl = '/Utente/SalvaUtente';


  // signals per lo stato 
  private accessTokenSignal = signal<string | null>(localStorage.getItem('accessToken'));
  private userSignal = signal<UserProfile | null>(
    localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null
  );

  // signal computato: reattivo e sempre aggiornato con i valori correnti di accessTokenSignal e userSignal
  public isAuthenticated = computed(() => !!this.accessTokenSignal());
  public currentUser = computed(() => this.userSignal());

  // metodo per effettuare la registrazione 
  register(userData: registerDTO): Observable<RegisterResponse> {
    return this._http.post<RegisterResponse>(this.registerUrl, userData);
  }

  // update utente usa sempre registetURL ma con l'id utente 

  // auth.services.ts
update(userData: UserSaveDTO): Observable<{ success: boolean; IDUtente?: number }> {
  return this._http.post<{ success: boolean; IDUtente?: number }>(this.salvaUrl, userData).pipe(
    tap(response => {
      if (response.success) {
        // Aggiorniamo il signal utente e il localStorage con i nuovi dati
        const current = this.userSignal();
        if (current) {
          const updatedUser: UserProfile = {
            ...current,
            username: userData.username,
            email: userData.email ?? current.email,
          };
          this.userSignal.set(updatedUser);
          localStorage.setItem('user', JSON.stringify(updatedUser));
        }
      }
    })
  );
}

  // metodo per effettuare il login
  login(credentials: LoginDTO) : Observable<LoginResponse> {
    return this._http.post<LoginResponse>(this.loginUrl, credentials).pipe(
      // aggiorna i signals e salva i dati nel localStorage
      tap(response => { // tap: per eseguire effetti collaterali senza modificare il flusso di dati dell'Observable
        if (response.success) { // se il login ha successo, salva i token e l'utente nel localStorage e aggiorna i signals
          localStorage.setItem('accessToken', response.accessToken);
          localStorage.setItem('refreshToken', response.refreshToken);
          localStorage.setItem('user', JSON.stringify(response.user));


          this.accessTokenSignal.set(response.accessToken); // aggiorna il signal con il nuovo accessToken
          this.userSignal.set(response.user); // aggiorna il signal con il nuovo user
        } 
      })
    );
  }

  getDettaglio(id: number): Observable<{success: boolean; data: UserProfile}> {
    return this._http.get<{ success: boolean; data: UserProfile }>(`Utente/UtenteSingolo/${id}`);
  }

  logout(): void {
    // rimuove i dati dal localStorage e resetta i signals
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');

    this.accessTokenSignal.set(null); // resetta il signal a null
    this.userSignal.set(null); // resetta il signal a null
  }


  getToken(): string | null {
    return this.accessTokenSignal();
  }
  
}
