import { Component, input } from '@angular/core';
import { CardHeader } from '../card-header/card-header.component';
import { Input } from '../input/input.component';

@Component({
  imports: [CardHeader, Input],
  selector: 'app-form-card',
  styleUrl: './form-card.component.css',
  templateUrl: './form-card.component.html',
})
export class FormCard {
  title = input<string>(''); // Titolo della card
}
