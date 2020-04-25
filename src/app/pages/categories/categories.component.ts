import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/entities/Category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  public category: Category;
  public categories: Category[];

  constructor() { 
    this.category = {name: null};
    this.categories = [];
  }
  /**
   * Metodo para agregar una nueva categoria
   */
  addCategory(){
    (this.validateCategory(this.category))?this.categories.push(this.category):window.alert("Nombre no valido, la longitud debe ser mayor a 3 caracteres");
    console.log(this.categories);
  }
    /**
   * Metodo para validar que la longitud de una cadena sea la adecuada para 
   * los campos de un formulario
   * @param string 
   */
  validateTextLong(parameter: string): boolean{
    return (parameter.length > 4)?true:false;
  }

  validateCategory(category: Category): boolean{
    category.name.trim();
    return (this.validateTextLong(category.name))?true:false;
  }
  ngOnInit(): void {
  }

}
