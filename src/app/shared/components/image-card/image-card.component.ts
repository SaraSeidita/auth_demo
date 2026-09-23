import { Component, input } from '@angular/core';
import { ImageCardVariant } from './model/image-card.model';

@Component({
  imports: [],
  selector: 'app-image-card',
  styleUrl: './image-card.component.css',
  templateUrl: './image-card.component.html',
})
export class ImageCard {

  label = input.required<string>();
  variant = input<ImageCardVariant>('homepage'); // Default variant is 'homepage'
  
  // Percorso dell'immagine PNG trasparente
  imageSrc = input.required<string>(); 

  // Mappa delle varianti basata sui colori dei mockup
  private variantMap: Record<ImageCardVariant, string> = {
    homepage: 'w-[180px] h-[180px] left-[111px] top-[131px] bg-[#FFB2EE]', // Esempio: sfondo rosa chiaro con bordo viola scuro
    login: 'w-[180px] h-[180px] left-[111px] top-[131px]bg-[#fed7aa]',     // Sfondo arancio chiaro / pesca
    register: 'w-[180px] h-[180px] left-[142px] top-[91px] bg-[#bae6fd]',  // Sfondo azzurro chiaro
  };

  cardClasses(): string {
    const base = [
      
      'border-4',
      'border-[#312244]',
      'shadow-[6px_6px_0px_#312244]',
      'rounded-[20px]',
      'flex',
      'items-center',
      'justify-center',
    ];

    base.push(this.variantMap[this.variant()]);

    return base.join(' ');
  }

}
