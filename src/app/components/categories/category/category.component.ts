import { Component, OnInit, Input } from '@angular/core';
import { Category } from 'src/app/entities/Category';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryCreatorComponent } from '../category-creator/category-creator.component';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {

  public formCategory: FormGroup;
  @Input()
  public category: Category;
  public newNameCategory: string = "";

  constructor(
    private categoriesService: CategoriesService,
    private modalService: NgbModal) {
    this.buildFormCategory();
  }

  private buildFormCategory() {
    this.formCategory = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)])
    });

  }

  private builCategory(): Category {
    return {
      name: this.formCategory.get("name").value
    };
  }

  get name(): AbstractControl {
    return this.formCategory.get("name");
  }

  editCategory() {
    var editNewCategory: Category = this.builCategory();
    if (confirm("¿Deséa editar esta categoría?")) {
      this.categoriesService.editCategory(this.category.id, this.category)
        .then(() => { console.log("Editado con éxito"); })
        .catch(error => { alert("Ha ocurrido un error al editar la categoría."); });
    }
  }

  editCategory2(content) {
    this.modalService.open(content, { centered: true });
  }

  openEditor() {
    const modalRef = this.modalService.open(CategoryCreatorComponent, { centered: true });
    modalRef.componentInstance.category = this.category;
  }

  removeCategory(categoryId: string) {
    console.log("ID ELIMINADO: " + categoryId);
    if (confirm("¿Deséas eliminar esta categoría?")) {
      this.categoriesService.removeCategory(categoryId)
        .then(() => { console.log("Eliminado!"); })
        .catch(error => { alert("Ha ocurrido un error al eliminar la categoría."); });
    }
  }

}