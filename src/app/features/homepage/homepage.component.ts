import { Component, inject } from '@angular/core';
import { Button } from '../../shared/components/button/button.component';
import { ImageCard } from '../../shared/components/image-card/image-card.component';
import { Router } from '@angular/router';
import { Footer } from '../../core/layout/footer/footer.component';
import { Header } from '../../core/layout/header/header.component';
import { ImageItem } from '../../shared/models/imageitem.model';

@Component({
  imports: [Button, ImageCard, Footer, Header],
  selector: 'app-homepage',
  styleUrl: './homepage.component.css',
  templateUrl: './homepage.component.html',
})
export class Homepage {

  routing = inject(Router); // Iniezione del servizio Router per la navigazione tra le pagine

  _imageItem: ImageItem = { // Utilizzo dell'interfaccia ImageItem per rappresentare l'immagine della homepage
    src: 'assets/image-card/homepage.png',
    alt: 'homepage image',
  };

  onClickRegister(): void {
    // bottone per navigare alla pagina di registrazione
    this.routing.navigate(['register']); // path per la pagina di registrazione
  }

  onClickLogin(): void {
    // bottone per navigare alla pagina di login
    this.routing.navigate(['login']); // path per la pagina di login
  }
}
