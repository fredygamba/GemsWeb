import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/entities/User';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  public email: string;
  public password: string;
  public user: User;

  constructor() {
    this.user = { name: null, lastname: null, email: null, password: null };
  }

  login() {
    console.log("Usuario: " + this.email + " - " + this.password);
  }

  register() {
    if (this.validateRegister(this.user)) {
      console.log("Registrar usuario...");
    }
  }

  validateRegister(user: User): boolean {
    if (user != undefined && user != null) {
    } else if (this.user.password.length > 5) {
    } else {
      return true;
    }
    return false;
  }

}
