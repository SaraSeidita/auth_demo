import { Component, input, output } from '@angular/core';
import { ButtonVariant } from './model/button.model';

@Component({
  imports: [],
  selector: 'app-button',
  styleUrl: './button.component.css',
  templateUrl: './button.component.html',
})

export class Button {
  
  label    = input.required<string>();
  variant  = input<ButtonVariant>('pink');
  disabled = input<boolean>(false);
  type     = input<'button' | 'submit'>('button');
  fullWidth = input<boolean>(false);
  
  clicked = output<void>();
  
  private variantMap: Record<ButtonVariant, string> = {
    pink:   'bg-[#ffc6ff] hover:bg-[#ffb0ff] active:bg-[#ff9aff]',
    blue:   'bg-[#c3f4ff] hover:bg-[#a8ecff] active:bg-[#8de4ff]',
    orange: 'bg-[#ffe3c6] hover:bg-[#ffd6a8] active:bg-[#ffc98a]',
    yellow: 'bg-[#ffff92] hover:bg-[#ffff70] active:bg-[#ffff4e]',
    green:  'bg-[#a8ffa8] hover:bg-[#8aff8a] active:bg-[#6cff6c]',
  };

  
  buttonClasses(): string {
    const base = [
      // Dimensioni dal design: 338x60, r:8
      'h-[60px] rounded-lg',
      // Bordo: 3px #450979 (inside → usa box-border + ring o border)
      'border-[3px] border-[#450979]',
      // Testo: Press Start 2P, 24px, nero, centrato
      "font-['Press_Start_2P'] text-[24px] text-black",
      'uppercase tracking-normal',
      // Layout
      'flex items-center justify-center',
      // Transizioni
      'transition-colors duration-150',
      // Cursore
      'cursor-pointer disabled:cursor-not-allowed disabled:opacity-50',
    ];

    // Larghezza
    base.push(this.fullWidth() ? 'w-full' : 'w-[338px]');

    // Colore variante
    base.push(this.variantMap[this.variant()]);

    return base.join(' ');
  }

  handleClick(): void {
    if (!this.disabled()) {
      this.clicked.emit();
    }
  }
}
