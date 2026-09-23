import { Component, inject } from '@angular/core';
import { Button } from '../../shared/components/button/button.component';
import { ImageCard } from '../../shared/components/image-card/image-card.component';
import { Router } from '@angular/router';
import { Footer } from '../../core/layout/footer/footer.component';
import { Header } from '../../core/layout/header/header.component';

@Component({
  imports: [Button, ImageCard, Footer, Header],
  selector: 'app-homepage',
  styleUrl: './homepage.component.css',
  templateUrl: './homepage.component.html',
})
export class Homepage {

  routing = inject(Router);


  onClickRegister(): void {
    // Navigate to the register page when the button is clicked
    console.log('Navigating to register page...');
    this.routing.navigate(['register']); // Use the correct path for the register page
  }

  onClickLogin(): void {
    // Navigate to the login page when the button is clicked
    console.log('Navigating to login page...');
    this.routing.navigate(['login']); // Use the correct path for the login page
  }
}
