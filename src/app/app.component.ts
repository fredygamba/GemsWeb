import { Component, OnInit } from '@angular/core';
import { UsersService } from './services/users/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'GemsWeb';

  constructor(private usersService: UsersService){

  }

  ngOnInit(): void {
    this.usersService.loadStorageUser();
    console.log(this.usersService.user);
  }

}