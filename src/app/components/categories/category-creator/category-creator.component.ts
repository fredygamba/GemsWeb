import { Component, OnInit, Input } from '@angular/core';
import { Category } from 'src/app/entities/Category';

@Component({
  selector: 'app-category-creator',
  templateUrl: './category-creator.component.html',
  styleUrls: ['./category-creator.component.scss']
})
export class CategoryCreatorComponent implements OnInit {

  @Input()
  private category: Category;

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.category);
  }


}