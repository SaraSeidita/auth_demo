import { Component, ElementRef, forwardRef, input, signal, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  imports: [FormsModule],
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, // Fornisce il ControlValueAccessor per collegare il componente personalizzato con il modulo di Angular Forms
      useExisting: forwardRef(() => ProfileRow), // Utilizza il componente ProfileRow come ControlValueAccessor
      multi: true, // Consente di avere più provider per NG_VALUE_ACCESSOR  
    }
  ],
  selector: 'app-profile-row',
  styleUrl: './profile-row.component.css',
  templateUrl: './profile-row.component.html',
})
export class ProfileRow implements ControlValueAccessor { // ControlValueAccessor interface serve a collegare il componente personalizzato con il modulo di Angular Forms

  placeholder = input<string>(''); // Testo segnaposto visualizzato all'interno del campo di input quando è vuoto
  disabled = input<boolean>(false); // Disabilita il campo di input se impostato su true

  @ViewChild('inputEl') inputElement?: ElementRef<HTMLInputElement>; // Riferimento all'elemento di input nel template

  value = '';
  isEditing = signal(false); // Stato di modifica del campo di input

  onChange: any = () => {}; // Funzione di callback per notificare il cambiamento del valore
  onTouched: any = () => {} // Funzione di callback per notificare che il campo è stato toccato

  enableEdit(): void {
    if (this.disabled()) return;
    this.isEditing.set(true);
    setTimeout(() => this.inputElement?.nativeElement.focus(), 0);
  }

  disableEdit(): void {
    this.isEditing.set(false);
    this.onTouched();
  }

  onInputChange(val: string): void {
    this.value = val;
    this.onChange(val);
  }

  writeValue(val: any): void {
    this.value = val || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  

  
}
