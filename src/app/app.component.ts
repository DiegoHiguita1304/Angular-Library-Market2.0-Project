import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  template: '<router-outlet>',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'Libreria-Market-2.0';
}




