import { Component, OnInit, Input } from '@angular/core';
import { Category } from 'src/app/entities/Category';
import { CategoriesService } from 'src/app/services/categories/categories.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {

  @Input()
  public category: Category;

  constructor(private categoriesService: CategoriesService) { }

  editCategory(categoryId: string) {
  }

  removeCategory(categoryId: string) {
    if (confirm("¿Deséas eliminar esta categoría?")) {
      this.categoriesService.removeCategory(categoryId)
        .then(() => { console.log("Eliminado!"); })
        .catch(error => { alert("Ha ocurrido un error al eliminar la categoría."); });
    }
  }

}