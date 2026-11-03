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
    profile: 'h-[507px]'
  };


  cardHeightClass = computed(() => this.heightMap[this.type()]); // Calcola la classe CSS dell'altezza della card in base al tipo selezionato
  // qua non serve una classe che concatena le classi CSS perché basta una sola classe per l'altezza della card, che viene calcolata dinamicamente in base al tipo selezionato. Non ci sono altre classi da concatenare, quindi non è necessario un metodo separato per gestire le classi CSS.


}
