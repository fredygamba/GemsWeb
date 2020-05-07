import { Component, OnInit } from '@angular/core';
import { IconService } from 'src/app/services/icons/icon.service';
import { Icon } from 'src/app/entities/Icon';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss']
})
export class IconsComponent implements OnInit {

  public listIcon: Icon[];
  public filteredIcons: Icon[];
  public formIcons: FormGroup;
  public searchIcon: string;

  constructor(private iconService: IconService) { 
    this.listIcon = [];
    this.filteredIcons = [];
    this.buildFormIcon();
  }

  public addIcon() {
    if (this.validateIcon()) {
      const icon: Icon = this.formIcons.value;
      this.iconService.addIcon(icon).then(() => {
        document.getElementById("modalAddIcon").click();
      }).catch(error => {
        alert("Se ha generado un error.");
        console.log(error);
      });
    }
  }

  private buildFormIcon() {
    this.formIcons = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)])
    });
  }

  filterIcons() {
    this.filteredIcons= [];
    if (this.searchIcon != undefined) {
      for (let i = 0; i < this.listIcon.length; i++) {
        var userAux = this.listIcon[i];
        if (this.searchTexttoIcon(this.searchIcon, userAux)) {
          this.filteredIcons.push(userAux);
        }
      }
      return this.filteredIcons;
    }else {
      return this.listIcon;
    }
   }

  get iconName(): AbstractControl {
    return this.formIcons.get("name");
  }

  getIcons() {
    this.iconService.getIcons().subscribe(result => {
      this.listIcon = result;
      this.filteredIcons = result;
    });
  }

  ngOnInit(): void {
    this.getIcons();
  }

  searchTexttoIcon(searchText: string, icon: Icon):boolean {
    if (icon.name.toLowerCase().includes(searchText.toLowerCase())) {
      return true;
    }
    return false;
  }

  validateIcon(): boolean{
    var iconName: AbstractControl = this.formIcons.get("name");
    iconName.patchValue(iconName.value.replace(/\s+/g, ' ').trim());
    if (!iconName.valid) {
      this.formIcons.markAsDirty();
      console.log("Nombre xD: " + iconName.value);
      return false;
    }
    return true;
  }

  validateNameIcon(nameIcon: string) {
    var aux: string = "";
    var positionCom: number;
    if (nameIcon.includes("<i") && nameIcon.includes("class")) {
      for (let i = 0; i < nameIcon.length; i++) {
        if (nameIcon.charAt[i] =='f' && (i < nameIcon.length) && nameIcon.charAt[i+2] == '-') {
          for (let j = i; j < nameIcon.length; j++) {
            if (nameIcon.charAt[j] != '"') {
              aux += nameIcon.charAt[j];
            }else{
              console.log("1." + aux);
              break;
            }
          }
        }
      }
    }else if (!nameIcon.includes("fa-")) {
      aux = "fa-" + nameIcon;
      console.log("2." + aux);
    }else {
      aux = nameIcon;
      console.log("3." + aux);
    }
  }

}
