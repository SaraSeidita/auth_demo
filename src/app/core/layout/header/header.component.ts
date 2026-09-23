import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-header',
  styleUrl: './header.component.css',
  templateUrl: './header.component.html',
})
export class Header {

  iconeStatusBar = [
    { src: 'assets/icons/signal.svg', alt: 'signal' },
    { src: 'assets/icons/wifi.svg', alt: 'wifi' },
    { src: 'assets/icons/batteria.svg', alt: 'batteria' },
  ];



}
