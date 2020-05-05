import { Component, OnInit, Input } from '@angular/core';
import { Category } from 'src/app/entities/Category';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {

  public formCategory: FormGroup;
  @Input()
  public category: Category;
  public newNameCategory: string="";

  constructor(private categoriesService: CategoriesService) {
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
      this.categoriesService.editCategory(this.category.id, editNewCategory)
       .then(() =>{console.log("Editado con éxito");})
       .catch(error => {alert("Ha ocurrido un error al editar la categoría."); });
    }
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