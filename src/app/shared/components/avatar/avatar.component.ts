import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-avatar',
  styleUrl: './avatar.component.css',
  templateUrl: './avatar.component.html',
})
export class Avatar {
  title = 'Avatar Component';
  imageSrc = input.required<string>(); 


  avatarClasses(): string {
    const base = [
      'flex items-center justify-center',
      'rounded-full',
      'overflow-hidden',
      'border-3 border-[#312244]',
      'w-[136px] h-[136px]', // Default size
    ]
    return base.join(' ');
  }
}
