import { Component, computed, input } from '@angular/core';
import { CardHeader } from '../card-header/card-header.component';
// import { Input } from '../input/input.component';
import { CardHeightVariant } from './model/form-card.model';

@Component({
  imports: [CardHeader],
  selector: 'app-form-card',
  styleUrl: './form-card.component.css',
  templateUrl: './form-card.component.html',
})
export class FormCard {
  title = input<string>(''); // Titolo della card
  type = input<CardHeightVariant>('register'); // Tipo di card (login o register)

  // l'altezza della card varia in base al contenuto 

  private heightMap: Record<CardHeightVariant, string> = {
    login: 'h-[247px]',
    register: 'h-[400px]',
  };


  cardHeightClass = computed(() => this.heightMap[this.type()]);


}
