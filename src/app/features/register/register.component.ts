import { Component, inject } from '@angular/core';
import { ImageCard } from '../../shared/components/image-card/image-card.component';
import { Header } from '../../core/layout/header/header.component';
import { Footer } from '../../core/layout/footer/footer.component';
import { Button } from '../../shared/components/button/button.component';
import { Router } from '@angular/router';
import { FormCard } from '../../shared/components/form-card/form-card.component';
import { Input } from '../../shared/components/input/input.component';
import { PasswordInput } from '../../shared/components/password-input/password-input.component';

@Component({
  imports: [ImageCard, Header, Footer, Button, FormCard, Input, PasswordInput],
  selector: 'app-register',
  styleUrl: './register.component.css',
  templateUrl: './register.component.html',
})
export class Register {
  private routing = inject(Router);

  
  onRegister() : void {
     console.log('Navigating to register page...');
    this.routing.navigate(['login']); // Use the correct path for the register page
  }

}
