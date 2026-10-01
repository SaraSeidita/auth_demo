import { Component, forwardRef, input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  imports: [ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, // Fornisce il ControlValueAccessor per collegare il componente personalizzato con il modulo di Angular Forms
      useExisting: forwardRef(() => Input), // Utilizza il componente Input come ControlValueAccessor
      multi: true, // Consente di avere più provider per NG_VALUE_ACCESSOR
    }
  ],
  selector: 'app-input',
  styleUrl: './input.component.css',
  templateUrl: './input.component.html',
})
export class Input implements ControlValueAccessor { // ControlValueAccessor interface serve a collegare il componente personalizzato con il modulo di Angular Forms
  label = input<string>(''); // Etichetta del campo di input
  placeholder = input<string>(''); // Testo segnaposto visualizzato all'interno del campo di input quando è vuoto
  type = input<string>('text'); // Tipo di input (ad esempio, "text", "password", "email", ecc.)

  value = '';
  onChange: any = () => {}; // Funzione di callback per notificare il cambiamento del valore
  onTouched: any = () => {} // Funzione di callback per notificare che il campo è stato toccato

  writeValue(val: any): void {
  this.value = val ?? ''; // assicura che val non sia mai null o undefined
}

  registerOnChange(fn: any): void {
    this.onChange = fn; // Registra la funzione di callback per il cambiamento del valore
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn; // Registra la funzione di callback per il tocco del campo
  }

  onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement; // Ottiene l'elemento di input dall'evento
    this.value = inputElement.value; // Aggiorna il valore del campo di input
    this.onChange(this.value); // Notifica il cambiamento del valore al modulo Angular Forms
  }
}
