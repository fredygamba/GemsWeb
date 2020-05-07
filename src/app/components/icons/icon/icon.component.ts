import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Icon } from 'src/app/entities/Icon';
import { IconService } from 'src/app/services/icons/icon.service';
import { CategoryCreatorComponent } from '../../categories/category-creator/category-creator.component';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {

  public formIcon: FormGroup;
  @Input()
  public icon: Icon;
  public auxNameIcon: string;
  public newNameIcon: string = "";
  public modalRemove: NgbModalRef;
  public modalEdit: NgbModalRef;

  constructor(
    private iconService: IconService,
    private modalService: NgbModal ) {
     }
  
  private buildFormIcon() {
    this.formIcon = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)])
    });
  }

  private builIcon(): Icon {
    return {
      name: this.formIcon.get("name").value
    };
  }

  editIcon() {
    var editNewIcon: Icon = this.builIcon();
    if (confirm("¿Deséa editar esta categoría?")) {
      this.iconService.editIcon(this.icon.id, editNewIcon)
        .then(() => { console.log("Editado con éxito"); })
        .catch(error => { alert("Ha ocurrido un error al editar la categoría."); });
    }
    this.modalEdit.close();
  }

  get name(): AbstractControl {
    return this.formIcon.get("name");
  }

  openModalRemoveIcon(content) {
    this.modalRemove = this.modalService.open(content, { centered: true });
  }

  openModalEditIcon(content) {
    this.modalEdit = this.modalService.open(content, { centered: true });
  }

  ngOnInit(): void {
    this.buildFormIcon();
  }

  removeIcon() {
      this.iconService.removeIcon(this.icon.id).then(() => { console.log("Eliminado!"); })
      .catch(error => { alert("Ha ocurrido un error al eliminar el icono."); });
      this.modalRemove.close();
  }

}
