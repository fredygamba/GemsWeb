import { Injectable } from '@angular/core';
import { User } from 'src/app/entities/User';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public user: User;

  constructor() {}

  addUser() { }
  editUser() { }
  getUser() { }
  getUsers() { }

  /**Cargar Usuario */
  loadStorageUser() {
    this.user = JSON.parse(localStorage.getItem("user"));
  }

  removeUser() { }

  saveStorageUser(user: User) {
    /**Asignó a la variable una clave/valor */
    localStorage.setItem("user", JSON.stringify(user));
  }
  /**
   * Metodo para terminar "sesión"
   */
  logOut(){
    this.user = null;
    localStorage.setItem("user",null);
  }

}