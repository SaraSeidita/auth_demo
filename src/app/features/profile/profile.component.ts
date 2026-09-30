import { Component } from '@angular/core';
import { Footer } from '../../core/layout/footer/footer.component';
import { Header } from '../../core/layout/header/header.component';
import { Button } from '../../shared/components/button/button.component';
import { FormCard } from '../../shared/components/form-card/form-card.component';
import { Avatar } from '../../shared/components/avatar/avatar.component';
import { ProfileRow } from '../../shared/components/profile-row/profile-row.component';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [Footer, Header, Button, FormCard, Avatar, ProfileRow, FormsModule],
  selector: 'app-profile',
  styleUrl: './profile.component.css',
  templateUrl: './profile.component.html',
})
export class Profile {

  userData = {
    username: 'Rosmerade',
    email: 'rosmerade@example.com',
    role: 'Admin',
  }

  onUpdate(): void {
    // Logica per aggiornare il profilo
    console.log('Profilo aggiornato');
  }
  
  onLogout(): void {
    // Logica per il logout
    console.log('Logout effettuato');
  } 
}
