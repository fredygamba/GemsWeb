import { Component, OnInit, Input } from '@angular/core';
import { Category } from 'src/app/entities/Category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {

  @Input()
  public category: Category;

  constructor() { }

}