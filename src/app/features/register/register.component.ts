import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { ImageCard } from '../../shared/components/image-card/image-card.component';
import { Header } from '../../core/layout/header/header.component';
import { Footer } from '../../core/layout/footer/footer.component';
import { Button } from '../../shared/components/button/button.component';
import { FormCard } from '../../shared/components/form-card/form-card.component';
import { Input } from '../../shared/components/input/input.component';
import { PasswordInput } from '../../shared/components/password-input/password-input.component';

import { AuthServices } from '../../shared/services/auth.services';
import { registerDTO } from '../../shared/models/registerDTO.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    ImageCard,
    Header,
    Footer,
    Button,
    FormCard,
    Input,
    PasswordInput
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class Register {
  private fb = inject(FormBuilder);
  public authServices = inject(AuthServices);
  private routing = inject(Router);

  errorMessage = signal<string | null>(null);

  // Reattivo e legato ai tuoi input custom tramite formControlName
  registerForm = this.fb.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    pw: ['', [Validators.required]],
    confirmPw: ['', [Validators.required]]
  });

  onRegister(): void {
    this.errorMessage.set(null);

    // 1. Controllo di validità base del form
    if (this.registerForm.invalid) {
      this.errorMessage.set('Inserisci tutti i campi correttamente');
      this.registerForm.markAllAsTouched();
      return;
    }

    const formValues = this.registerForm.getRawValue();

    // 2. Controllo coincidenza password
    if (formValues.pw !== formValues.confirmPw) {
      this.errorMessage.set('Le password non corrispondono');
      return;
    }

    // 3. Estrazione del payload pulito per il backend (registerDTO)
    const payload: registerDTO = {
      username: formValues.username!,
      email: formValues.email!,
      pw: formValues.pw!
    };

    // 4. Invio
    this.authServices.register(payload).subscribe({
      next: (res) => {
        if (res.success) {
          console.log('Registrazione avvenuta con successo:', res);
          this.routing.navigate(['/login']);
        }
      },
      error: (err) => {
        if (err.status === 409) {
          this.errorMessage.set('Username già esistente');
        } else {
          this.errorMessage.set(err.error?.message || 'Errore durante la registrazione');
        }
      }
    });
  }
}