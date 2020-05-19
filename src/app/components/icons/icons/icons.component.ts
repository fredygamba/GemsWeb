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
  private image: File;
  public files: File[] = [];
  public iconBase64: string;

  constructor(private iconService: IconService) {
    this.listIcon = [];
    this.filteredIcons = [];
    this.buildFormIcon();
    console.log(this.files);
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
    this.filteredIcons = [];
    if (this.searchIcon != undefined) {
      for (let i = 0; i < this.listIcon.length; i++) {
        var userAux = this.listIcon[i];
        if (this.searchTexttoIcon(this.searchIcon, userAux)) {
          this.filteredIcons.push(userAux);
        }
      }
      return this.filteredIcons;
    } else {
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

  handleImage(event) {
    this.image = event.target.files[0];
    //const file = event.target.files[0];
    this.files.push(this.image);
    console.log("Imagen: ", this.image);

  }

  onSelect(event) {
    this.files.push(...event.addedFiles);
    this.convertToBase64(this.files[0]).then((res) => {
      console.log(res);
      this.iconBase64 = "" + res;
      // console.log("" + this.iconBase64);
    });
  }

  convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  initComponentDrope() {
    var dropZone = document.getElementById('drop-zone');
    dropZone.ondrop;
  }

  ngOnInit(): void {
    this.getIcons();
  }

  searchTexttoIcon(searchText: string, icon: Icon): boolean {
    if (icon.name.toLowerCase().includes(searchText.toLowerCase())) {
      return true;
    }
    return false;
  }

  validateIcon(): boolean {
    var iconName: AbstractControl = this.formIcons.get("name");
    iconName.patchValue(iconName.value.replace(/\s+/g, ' ').trim());
    iconName.patchValue(this.validateNameIcon(iconName.value));
    if (!iconName.valid) {
      this.formIcons.markAsDirty();
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
