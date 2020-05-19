import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GemComponent } from 'src/app/components/gems/gem/gem.component';
import { Gem } from 'src/app/entities/Gem';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  public openGemCreator() {
    this.modalService.open(GemComponent, { centered: true });
  }

  public openGemEditor(gem: Gem) {
    let gemEditor = this.modalService.open(GemComponent, { centered: true });
    gemEditor.componentInstance.gem = gem;
  }

}
