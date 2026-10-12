import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'; // Modulo nativo per ngModel
import { Router, RouterLink } from '@angular/router';

import { ImageCard } from '../../shared/components/image-card/image-card.component';
import { Header } from '../../core/layout/header/header.component';
import { Footer } from '../../core/layout/footer/footer.component';
import { FormCard } from '../../shared/components/form-card/form-card.component';
import { Input } from '../../shared/components/input/input.component';
import { PasswordInput } from '../../shared/components/password-input/password-input.component';
import { Button } from '../../shared/components/button/button.component';
import { Checkbox } from '../../shared/components/checkbox/checkbox.component';

import { AuthServices } from '../../shared/services/auth.services';
import { LoginDTO } from '../../shared/models/loginDTO.model';
import { ImageItem } from '../../shared/models/imageitem.model';

@Component({
  imports: [
    ReactiveFormsModule,
    RouterLink,
    ImageCard, 
    Header, 
    Footer, 
    FormCard, 
    Input, 
    PasswordInput, 
    Button, 
    Checkbox
  ],
  selector: 'app-login',
  styleUrl: './login.component.css',
  templateUrl: './login.component.html',
})
export class Login {
  private fb = inject(FormBuilder); // Iniezione del FormBuilder per creare il form reattivo
  // FormBuilder è un servizio che aiuta a creare form reattivi in Angular. 
  // Viene iniettato nel componente per poter costruire il form di login in modo più semplice e leggibile.
  public authServices = inject(AuthServices); // Iniezione del servizio AuthServices per gestire l'autenticazione
  private routing = inject(Router); // Iniezione del servizio Router per la navigazione tra le pagine

  _imageItem: ImageItem = { // Utilizzo dell'interfaccia ImageItem per rappresentare l'immagine della pagina di login
    src: 'assets/image-card/login.png',
    alt: 'login image',
  };

  credential = this.fb.group({ // Creazione del form reattivo per le credenziali di login
    // .group crea un gruppo di controlli del form, in questo caso per username e password
    username: ['', [Validators.required]], // Campo obbligatorio per il nome utente
    pw: ['', [Validators.required]], // Campo obbligatorio per la password
  });
  
  rememberMe = false; // stato isolato solo per la UI, non viene gestito (solo estetico)

  errorMessage = signal<string | null>(null); // Segnale per gestire i messaggi di errore, inizialmente nullo
  isLoading = signal<boolean>(false); // Segnale per gestire lo stato di caricamento, inizialmente falso

  onLogin(): void {
    this.isLoading.set(true); // Imposta lo stato di caricamento a true quando inizia il processo di login
    this.errorMessage.set(null); // Resetta il messaggio di errore a null all'inizio del processo di login

    if (this.credential.invalid) { // Controllo se il form è valido, se non lo è mostra un messaggio di errore
      this.errorMessage.set('Inserisci tutti i campi correttamente');
      this.credential.markAllAsTouched(); // Segna tutti i campi del form come "toccati" per mostrare eventuali messaggi di validazione
      this.isLoading.set(false);
      return;
  }

  const payload: LoginDTO = this.credential.getRawValue() as LoginDTO; // Ottiene i valori del form come oggetto LoginDTO, che contiene username e pw

  this.authServices.login(payload).subscribe({ // Chiama il metodo login del servizio AuthServices e si iscrive all'Observable restituito per gestire la risposta
    
    next: (res) => { // next viene chiamato quando la richiesta ha successo
      this.isLoading.set(false);

      if (res.success && res.user?.id) { // Controlla se la risposta indica successo e se l'oggetto user contiene un id valido
        this.routing.navigate(['/profile', res.user.id]);
      } else {
        this.errorMessage.set('Impossibile recuperare i dati dell\'utente.');
      }
    },
    
    error: (err) => { // error viene chiamato quando la richiesta fallisce
      this.isLoading.set(false);
      if (err.status === 401) {
        this.errorMessage.set('Credenziali non valide');
      } else {
        this.errorMessage.set('Errore di connessione. Riprova più tardi.');
      }
    }
  });
}
}