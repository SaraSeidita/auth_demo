// componente 'header' che contiene l'header dell'applicazione, che simula la status bar di un dispositivo mobile

import { Component } from '@angular/core';
import { ImageItem } from '../../../shared/models/imageitem.model';

@Component({
  imports: [],
  selector: 'app-header',
  styleUrl: './header.component.css',
  templateUrl: './header.component.html',
})
export class Header {

  // Array di oggetti che rappresentano le icone della status bar, con le proprietà 'src' e 'alt' importate dall'interfaccia IconStatusBar
  _iconsStatusBar: ImageItem[] = [
    { src: 'assets/icons/signal.svg', alt: 'signal' },
    { src: 'assets/icons/wifi.svg', alt: 'wifi' },
    { src: 'assets/icons/batteria.svg', alt: 'batteria' },
  ];



}
