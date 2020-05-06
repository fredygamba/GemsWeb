import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Category } from 'src/app/entities/Category';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryCreatorComponent } from '../category-creator/category-creator.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  public categories: Category[];
  public errors = { categoryName: false };
  public status = { addingCategory: false }
  public filteredCategories: Category[];
  public formCategory: FormGroup;
  public searchText: string;

  constructor(private categoriesService: CategoriesService) {
    this.categories = [];
    this.filteredCategories = [];
    this.buildFormCategory();
  }

  /**
   * Metodo para agregar una nueva categoria
   */
  public addCategory() {
    if (this.validateCategory()) {
      this.status.addingCategory = true;
      const category: Category = this.formCategory.value;
      this.categoriesService.addCategory(category).then(() => {
        document.getElementById("categoryCreatorModal").click();
      }).catch(error => {
        alert("Se ha generado un error.");
        console.log(error);
      }).finally(() => {
        this.status.addingCategory = false;
      });
    }
  }

  private buildFormCategory() {
    this.formCategory = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)])
    });
  }

  private contains(category: Category, text: string) {
    if (text != undefined) {
      return category.name.includes(text);
    }
    return true;
  }

  /**
   * Metodo para filtrar categorías
   */
  filterCategories() {
    this.filteredCategories = [];
    if (this.searchText == undefined) {
      return this.categories;
    } else {
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

  get categoryName(): AbstractControl {
    return this.formCategory.get("name");
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
   * Metodo para validar una categoria
   * @param category 
   */
  validateCategory(): boolean {
    var categoryName: AbstractControl = this.formCategory.get("name");
    categoryName.patchValue(categoryName.value.replace(/\s+/g, ' ').trim());
    if (!categoryName.valid) {
      this.errors.categoryName = true;
      this.formCategory.markAsDirty();
      return false;
    }
    return true;
  }

}