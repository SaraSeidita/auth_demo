import { Component } from '@angular/core';
import { ImageCard } from '../../shared/components/image-card/image-card.component';

@Component({
  imports: [ImageCard],
  selector: 'app-login',
  styleUrl: './login.component.css',
  templateUrl: './login.component.html',
})
export class Login {}
