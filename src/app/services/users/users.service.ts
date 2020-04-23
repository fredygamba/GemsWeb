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

  loadStorageUser() {
    this.user = JSON.parse(localStorage.getItem("user"));
  }

  removeUser() { }

  saveStorageUser(user: User) {
    localStorage.setItem("user", JSON.stringify(user));
  }

}