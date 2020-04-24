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

  addCategory(){
    this.categories.push(this.category);
    console.log(this.categories);
  }

  validateCategory(){

  }
  ngOnInit(): void {
  }

}
