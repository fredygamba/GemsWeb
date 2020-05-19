import { Component, OnInit, Input } from '@angular/core';
import { Gem } from 'src/app/entities/Gem';

@Component({
  selector: 'app-gem-creator',
  templateUrl: './gem-creator.component.html',
  styleUrls: ['./gem-creator.component.scss']
})
export class GemCreatorComponent implements OnInit {

  @Input("gem") public gem: Gem;

  constructor() { }

  addGem() {

  }

  editGem() {

  }

  ngOnInit(): void {
    console.log(this.gem);
  }


}
