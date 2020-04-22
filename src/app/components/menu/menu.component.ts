import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  constructor() { }

  login() {
    var usuario = <HTMLInputElement> document.getElementById("inputUsuario");
    alert("Iniciando sesión..." + usuario);
  }

  register(){
    alert("Registrando Usuario.....");
  }

}
