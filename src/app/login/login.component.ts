import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
loginModal: any;
open(arg0: any) {
throw new Error('Method not implemented.');
}
  email: string = '';
  password: string = '';

  constructor() {}

  login() {
    // Aquí agregarías la lógica para enviar los datos de inicio de sesión al servidor
    console.log('Email:', this.email);
    console.log('Password:', this.password);
    // Aquí podrías llamar a un servicio para enviar los datos al servidor y manejar la respuesta
  }
}
