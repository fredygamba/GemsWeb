import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  constructor(public userService: UsersService) {
   }

   showUser(){
     (this.userService.user != null)?this.userService.loadStorageUser():window.alert("No hay usuario registrado");
   }

}
