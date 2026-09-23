import { Component } from '@angular/core';
import { ImageCard } from '../../shared/components/image-card/image-card.component';

@Component({
  imports: [ImageCard],
  selector: 'app-register',
  styleUrl: './register.component.css',
  templateUrl: './register.component.html',
})
export class Register {}
