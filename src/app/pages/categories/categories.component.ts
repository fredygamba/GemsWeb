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
    this.categoriesService.addCategory(this.category).then(res => {
      document.getElementById("categoryModal").click();
    }).catch(error => {
      alert("Se ha generado un error.");
      console.log(error);
    });
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
  /**
   * Metodo para almacenar/guardar cambios de una categoria
   * @param categoryId 
   */
  save(categoryId: string) {
    // Validar categoría
    if (this.validateCategory(this.category)) {
      if (categoryId == null) {
        this.addCategory();
      } else {
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
   * Metodo para validar una categoria
   * @param category 
   */
  validateCategory(category: Category): boolean {
    category.name.trim();
    return (this.validateTextLong(category.name) && (this.validateNumberInCategory(category.name))) ? true : false;
  }

  /**
 * Metodo para validar si una cadena tiene numeros
 * @param string 
 */
  validateNumberInCategory(string: string): boolean {
    if (this.validateTextLong(string)) {
      (string.match("[0-9]+")) ? window.alert("La categoría no debe tener numeros") : "";
      return (!string.match("[0-9]+")) ? true : false;
    }
  }

  /**
 * Metodo para validar que la longitud de una cadena sea la adecuada para 
 * los campos de un formulario
 * @param string 
 */
  validateTextLong(text: string): boolean {
    return text.length > 3;
  }

}
