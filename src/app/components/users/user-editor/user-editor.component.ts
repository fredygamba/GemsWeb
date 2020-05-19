import { Component, OnInit, Input, Output } from '@angular/core';
import { User } from 'firebase';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-editor',
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.scss']
})
export class UserEditorComponent implements OnInit {

  @Input("user") public user: User;

  constructor(private modalService: NgbModal) { }

  public editUser() {

  }

  public close() {
    this.modalService.dismissAll();
  }

  public ngOnInit(): void {
    console.log(this.user);
  }

}