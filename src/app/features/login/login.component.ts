import { Component, inject } from '@angular/core';
import { ImageCard } from '../../shared/components/image-card/image-card.component';
import { Header } from '../../core/layout/header/header.component';
import { Footer } from '../../core/layout/footer/footer.component';
import { FormCard } from '../../shared/components/form-card/form-card.component';
import { Input } from '../../shared/components/input/input.component';
import { PasswordInput } from '../../shared/components/password-input/password-input.component';
import { Router } from '@angular/router';
import { Button } from '../../shared/components/button/button.component';
import { Checkbox } from '../../shared/components/checkbox/checkbox.component';

@Component({
  imports: [ImageCard, Header, Footer, FormCard, Input, PasswordInput, Button, Checkbox],
  selector: 'app-login',
  styleUrl: './login.component.css',
  templateUrl: './login.component.html',
})
export class Login {
  private routing = inject(Router);
  
  onLogin(): void {
    console.log('Navigating to profile page...');
    this.routing.navigate(['profile']);
  }
}
