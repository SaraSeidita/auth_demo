import { Component, inject, input, OnInit, signal } from '@angular/core';
import { Footer } from '../../core/layout/footer/footer.component';
import { Header } from '../../core/layout/header/header.component';
import { Button } from '../../shared/components/button/button.component';
import { FormCard } from '../../shared/components/form-card/form-card.component';
import { Avatar } from '../../shared/components/avatar/avatar.component';
import { ProfileRow } from '../../shared/components/profile-row/profile-row.component';
import { FormsModule } from '@angular/forms';
import { AuthServices } from '../../shared/services/auth.services';
import { Router } from '@angular/router';
import { UserProfile } from '../../shared/models/loginDTO.model';
import { UserSaveDTO } from '../../shared/models/utente.model';

@Component({
  imports: [Footer, Header, Button, FormCard, Avatar, ProfileRow, FormsModule],
  selector: 'app-profile',
  styleUrl: './profile.component.css',
  templateUrl: './profile.component.html',
})
export class Profile implements OnInit {
  public authServices = inject(AuthServices);
  private routing = inject(Router);
  
  idUtente = input<string>();

  profileData = signal<UserProfile | null>(null);
  isLoading = signal<boolean>(true);

  isSaving = signal<boolean>(false);

  successMessage = signal<string | null>(null);
  errorMessage = signal<string | null>(null);

  ngOnInit(): void {
    const userId = Number(this.idUtente()) || this.authServices.currentUser()?.id;

    if (!userId) {
      console.error('Utente non trovato');
      this.routing.navigate(['/login']);
      return;
    }

    this.authServices.getDettaglio(userId).subscribe({
      next: (response) => {
        if (response.success) {
          this.profileData.set(response.data);
        } else {
          this.errorMessage.set('Errore nel recupero dei dettagli utente');
        }
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Errore nella chiamata HTTP:', err);
        this.errorMessage.set('Errore di connessione');
        this.isLoading.set(false);
      }
    });
  }

  onFieldChange(field: keyof UserProfile, value: string): void {
    this.profileData.update((prev) => prev ? { ...prev, [field]: value } : null);
  }

  onUpdate(): void {
    const current = this.profileData();
    if (!current) return;

    this.isSaving.set(true);
    this.errorMessage.set(null);
    this.successMessage.set(null);

    // Prepariamo il payload SENZA il campo Pw (o impostato a null/undefined)
    const payload: UserSaveDTO = {
      ID: current.id,
      username: current.username,
      email: current.email,
      ruolo: current.ruolo,
      profilePicUrl: current.profilePicProfile,
      pw: null // Non inviamo alcuna password per non sovrascrivere quella nel DB
    };

    console.log('Payload inviato per aggiornamento:', payload);

    this.authServices.update(payload).subscribe({
      next: (response) => {
        this.isSaving.set(false);
        if (response.success) {
          console.log('i dati aggiornati sono:', response);
          this.successMessage.set('Profilo aggiornato con successo!');
        } else {
          console.log('Errore durante l\'aggiornamento:', response);
          this.errorMessage.set('Errore durante l\'aggiornamento.');
        }
      },
      error: (err) => {
        this.isSaving.set(false);
        if (err.status === 409) {
          this.errorMessage.set('Username già in uso da un altro utente.');
        } else if (err.status === 400) {
          this.errorMessage.set('Dati non validi. Controlla i campi.');
        } 
        
        else {
          this.errorMessage.set('Errore durante il salvataggio.');
        }
      }
    });
  }
  
  onLogout(): void {
    // Logica per il logout
    console.log('Logout effettuato');
    this.authServices.logout();
    this.routing.navigate(['homepage']); // Naviga alla pagina di login dopo il logout
  } 
}
