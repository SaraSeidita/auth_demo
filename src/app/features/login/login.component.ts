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
  private fb = inject(FormBuilder);
  public authServices = inject(AuthServices);
  private routing = inject(Router);

  credential = this.fb.group({
    username: ['', [Validators.required]],
    pw: ['', [Validators.required]],
  });
  
  rememberMe = false; // Stato isolato solo per la UI

  errorMessage = signal<string | null>(null);
  isLoading = signal<boolean>(false);

  onLogin(): void {
    
    this.isLoading.set(true);
    this.errorMessage.set(null);

    if (this.credential.invalid) {
      this.errorMessage.set('Inserisci tutti i campi correttamente');
      this.credential.markAllAsTouched();
      this.isLoading.set(false);
      return;
    }

    const formValues = this.credential.getRawValue(); // Ottieni i valori del form come oggetto LoginDTO

    const payload: LoginDTO = {
      username: formValues.username!,
      pw: formValues.pw!
    };

    // Inviamo l'oggetto DTO direttamente al servizio
    this.authServices.login(payload).subscribe({
      next: (res) => {
        console.log('Login successful:', res);
        this.isLoading.set(false);
        this.credential.reset();
        
        // Navigazione eseguita nel 'next' della chiamata HTTP
        this.routing.navigate(['profile']);
      },
      error: (err) => {
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