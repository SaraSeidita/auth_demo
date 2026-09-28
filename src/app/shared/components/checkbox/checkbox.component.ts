import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-checkbox',
  styleUrl: './checkbox.component.css',
  templateUrl: './checkbox.component.html',
})
export class Checkbox {
  label = input<string>(''); // Label della checkbox
  checked = input<boolean>(false); // Stato della checkbox (selezionata o meno)
}
