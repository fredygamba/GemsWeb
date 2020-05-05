import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users/users.service';
import { User } from 'src/app/entities/User';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public listAtributes: string[];
  public users: User[];
  public filteredUsers: User[];
  public searchUser: string;
  
  constructor(private userService: UsersService) {
    this.listAtributes= ["Nombres", "Apellidos","Correo electrónico","Tipo de Usuario","Más opciones"];
    this.users= [];
    this.filteredUsers= [];
   }

   filterUser() {
    this.filteredUsers= [];
    if (this.searchUser != undefined) {
      for (let i = 0; i < this.users.length; i++) {
        var userAux = this.users[i];
        if (this.searchTexttoUser(this.searchUser, userAux)) {
          this.filteredUsers.push(userAux);
        }
      }
      return this.filteredUsers;
    }else {
      return this.users;
    }
   }

   getUsers() {
      this.userService.getUsers().subscribe(result => {
        this.filteredUsers = result;
        this.users= result;
      } );
   }

  ngOnInit(): void {
    this.getUsers();
  }

  searchTexttoUser(searchText: string, user: User):boolean {
    if (user.id.toLowerCase().includes(searchText.toLowerCase()) || user.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
       user.lastName.toLowerCase().includes(searchText.toLowerCase()) || user.email.toLowerCase().includes(searchText.toLowerCase())) {
      return true;
    }
    return false;
  }

}
