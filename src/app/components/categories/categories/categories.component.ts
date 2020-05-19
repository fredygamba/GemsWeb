import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Category } from 'src/app/entities/Category';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { IconService } from 'src/app/services/icons/icon.service';
import { Icon } from 'src/app/entities/Icon';

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
  public filteredIconsInCategories: Icon[];
  public formCategory: FormGroup;
  public listIcon: Icon[];
  public searchText: string;
  public searchIconInCategories: string;

  constructor(private categoriesService: CategoriesService,
              private iconService: IconService) {
    this.categories = [];
    this.filteredCategories = [];
    this.listIcon = [];
    this.filteredIconsInCategories = [];
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
          this.filteredCategories.push(this.categories[i]);
        }
      }
      return this.filteredCategories;
    }
  }

  filterIconsInCategories() {
    this.filteredIconsInCategories= [];
    if (this.searchIconInCategories != undefined) {
      for (let i = 0; i < this.listIcon.length; i++) {
        var iconAux = this.listIcon[i];
        if (this.searchTexttoIcon(this.searchIconInCategories, iconAux)) {
          this.filteredIconsInCategories.push(iconAux);
        }
      }
      return this.filteredIconsInCategories;
    }else {
      return this.listIcon;
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

  getIcons() {
    this.iconService.getIcons().subscribe(result => {
      this.listIcon = result;
      this.filteredIconsInCategories = result;
    });
  }

  ngOnInit(): void {
    this.getCategories();
    this.getIcons();
  }

  searchTexttoIcon(searchText: string, icon: Icon):boolean {
    if (icon.name.toLowerCase().includes(searchText.toLowerCase())) {
      return true;
    }
    return false;
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

  validateNameIcon(nameIcon: string): string {
    var aux: string = "";
    if (nameIcon.includes("<i") && nameIcon.includes("class")) {
      for (let i = 0; i < nameIcon.length; i++) {
        if (nameIcon.charAt(i) == 'f' && (i < nameIcon.length) && nameIcon.charAt(i + 2) == '-') {
          for (let j = i; j < nameIcon.length; j++) {
            if (nameIcon.charAt(j) != '"') {
              aux += nameIcon.charAt(j);
            } else {
              return aux;
            }
          }
        }
      }
    } else if (!nameIcon.includes("fa-")) {
      aux = "fa-" + nameIcon;
      return aux;
    } else {
      aux = nameIcon;
      return aux;
    }
  }

}