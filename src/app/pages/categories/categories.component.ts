import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Category } from 'src/app/entities/Category';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  public category: Category;
  public errorsNewCategories = {newCategory: false};
  public categories: Category[];
  public filteredCategories: Category[];
  public formCategories: FormGroup;
  public searchText: string;

  constructor(private categoriesService: CategoriesService) {
    this.category = { name: null };
    this.categories = [];
    this.filteredCategories = [];
    this.buildFormCategory();
  }

  /**
   * Metodo para agregar una nueva categoria
   */
  addCategory(newCategory: Category) {
    // (this.validateCategory(this.category))?this.categories.push(this.category):window.alert("Nombre no valido, la longitud debe ser mayor a 3 caracteres");
    this.categoriesService.addCategory(newCategory).then(res => {
      document.getElementById("categoryModal").click();
    }).catch(error => {
      alert("Se ha generado un error.");
      console.log(error);
    });
  }

  private buildFormCategory(){
    this.formCategories = new FormGroup({
      nameFormCategory: new FormControl('',[Validators.required, Validators.minLength(3)])
    });
  }

  private buildCategory(): Category{
    return {
      name : this.formCategories.get("nameFormCategory").value
    }
  }

  public contains(category: Category, text: string) {
    if (text != undefined) {
      return category.name.includes(text);
    }
    return true;
  }

  editCategory(categoryId: string) {
  }
  /**
   * Metodo para filtrar categorías
   */
  filterCategories() {
    this.filteredCategories = [];
    if(this.searchText == undefined){
      return this.categories;
    }else{
      for (let i = 0; i < this.categories.length; i++) {
        var categoryAux = this.categories[i].name.toLowerCase();
        if (categoryAux.includes(this.searchText.toLowerCase())) {
          //console.log("categoria : " + categoryAux + " palabra a buscar " + this.searchText.toLowerCase());
          this.filteredCategories.push(this.categories[i]);
        }
      }
      return this.filteredCategories;
    }
    
  }

  get formCategory(): AbstractControl {
    return this.formCategories.get("nameFormCategory");
  }

  getCategories() {
    this.categoriesService.getCategories().subscribe(result => {
      this.categories = result;
      this.filteredCategories = result;
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
    if (this.validateAddCategory()) {
      if (categoryId == null) {
        var category = this.buildCategory();
        this.addCategory(category);
      }
    }else{
      this.editCategory(categoryId);
      console.log("Entro al else");
    }
  }

  removeCategory(categoryId: string) {
    if (confirm("¿Deséas eliminar esta categoría?")) {
      this.categoriesService.removeCategory(categoryId)
        .then(() => { console.log("Eliminado!"); })
        .catch(error => { alert("Ha ocurrido un error al eliminar la categoría."); });
    }
  }

  validateAddCategory(): boolean{
    var formCategory: AbstractControl = this.formCategories.get("nameFormCategory");
    formCategory.patchValue(formCategory.value.replace(/\s+/g, ' ').trim());
    if (!formCategory.valid) {
      this.errorsNewCategories.newCategory = true;
      this.formCategory.markAsDirty();
      //return true;
    }else {
      return true;
    }
    return false;
  }

  /**
   * Metodo para validar una categoria
   * @param category 
   */
  validateCategory(category: Category): boolean {
    return (this.validateTextLong(category.name.trim()) && (this.validateNumberInCategory(category.name.trim()))) ? true : false;
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
    return text?.length > 3;
  }

}