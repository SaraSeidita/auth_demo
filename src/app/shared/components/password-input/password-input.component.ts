import { Component, forwardRef, input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  imports: [ReactiveFormsModule],
  providers: [{
    provide: NG_VALUE_ACCESSOR, // Fornisce il ControlValueAccessor per collegare il componente personalizzato con il modulo di Angular Forms
    useExisting: forwardRef(() => PasswordInput), // Utilizza il componente PasswordInput come ControlValueAccessor
    multi: true, // Consente di avere più provider per NG_VALUE_ACCESSOR
  }
  ],
  selector: 'app-password-input',
  styleUrl: './password-input.component.css',
  templateUrl: './password-input.component.html',
})
export class PasswordInput implements ControlValueAccessor {
  label = input<string>(''); // Etichetta del campo di input
  showPassword = signal<boolean>(false); // Stato per mostrare/nascondere la password
  
  value = '';
  onChange: any = () => {}
  onTouched: any = () => {}

  toggleShow(): void {
    this.showPassword.update(v => !v); // Inverte lo stato di showPassword
  }


  // uguale a InputComponent
  
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
