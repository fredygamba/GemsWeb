import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Category } from 'src/app/entities/Category';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  public category: Category;
  public categories: Category[];

  constructor(private categoriesService: CategoriesService) {
    this.category = { name: null };
    this.categories = [];
  }
  
  /**
   * Metodo para agregar una nueva categoria
   */
  addCategory() {
    // (this.validateCategory(this.category))?this.categories.push(this.category):window.alert("Nombre no valido, la longitud debe ser mayor a 3 caracteres");
    this.categoriesService.addCategory(this.category);
    document.getElementById("categoryModal").click();
  }

  editCategory(categoryId: string) {
  }

  getCategories() {
    this.categoriesService.getCategories().subscribe(result => {
      this.categories = result;
    });
  }

  ngOnInit(): void {
    this.getCategories();
  }

  save(categoryId: string) {
    // Validar categoría
    if (true) {
      if (categoryId == null) {
        this.addCategory();
      } else{
        this.editCategory(categoryId);
      }
    }
  }

  removeCategory(categoryId: string) {
    if (confirm("¿Deséas eliminar esta categoría?")) {
      this.categoriesService.removeCategory(categoryId)
        .then(() => { console.log("Eliminado!"); })
        .catch(error => { alert("Ha ocurrido un error al eliminar la categoría."); });
    }
  }
  /**
 * Metodo para validar que la longitud de una cadena sea la adecuada para 
 * los campos de un formulario
 * @param string 
 */
  validateTextLong(parameter: string): boolean {
    return (parameter.length > 4) ? true : false;
  }

  validateCategory(category: Category): boolean {
    category.name.trim();
    return (this.validateTextLong(category.name)) ? true : false;
  }

}
