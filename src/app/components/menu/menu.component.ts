import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/entities/User';
import { element } from 'protractor';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  public email: string;
  public password: string;
  public confPassword: string;
  public user: User;

  constructor(public userService: UsersService) {
    this.email ="";
    this.password = "";
    this.confPassword = "";
    this.user = { name: "", lastname: "", email: "", password: "" };
  }

  login() {
    if (this.validateEmail(this.email) && this.validatePasswordLong(this.password)) {
      var remember: boolean = (<HTMLInputElement>document.getElementById("checkRecId")).checked;
      if (remember) {
        this.userService.saveStorageUser({id: "1", name: null, lastname: null, email: this.email, password: this.password});
      }
      window.alert("USUARIO CORRECTO: " + "Usuario: " + this.email + " - " + this.password + "-" + remember);
      //Guardar usuario
    }else if (!this.validateEmail(this.email)) {
      window.alert("Correo Electronico Incorrecto");
    }else{
      window.alert("Contraseña no valida");
    }
  }

  register() {
    if (this.validateRegister(this.user)) {
      window.alert("Se ha registrado con exito el usuario: " + this.user.name + " " + this.user.lastname);
    }
  }

  /**
   * Metodo para validar si un email cuenta con arroba y .com
   * @param string 
   */
  validateEmail(string:string):boolean{
    if (string.length > 5) {
      if (string.includes(".com") && (string.includes("@"))) {
        return true;
      }
    }
    return false;
  }
  /**
   * Metodo pra validar si una contraseña cuenta con la longitud correspondiente
   */
  validatePasswordLong(string:string):boolean{
    if (string.length > 4) {
      return true;
    }
    return false;
  }
  /**
   * Metodo para validar que la longitud de una cadena sea la adecuada para 
   * los campos de un formulario
   * @param string 
   */
  validateTextLong(string:string):boolean{
    if (string.length > 4) {
      return true;
    }
    return false;
  }
  /**
   * Metodo para validar si una cadena tiene numeros
   * @param string 
   */
  validateNumberInName(string:string):boolean{
    if (string.length > 4) {
      if (!string.match("[0-9]+")) {
         return true;
      }
    }
    return false;
  }
  /**
   * Metodo que valida todos los campos del registro del nuevo Usuario
   * @param user 
   */
  validateRegister(user: User): boolean {
    if (user != undefined && user != null) {
      if (this.validateLongCamposRegistro(user)) {
        if (this.validateNameUserRegistre(user)) {
          if (this.validateTermsOfUse()) {
            if (this.validatePasswordsRegistre(user.password,this.confPassword)) {
              return true;
            }
          }
        }
      }
    } 
    return false;
  }
  /**
   * Metodo para validar Si se acepto termino de de las Condiciones de Uso del
   * sitio web
   */
  validateTermsOfUse():boolean{
    var conditionUse = (<HTMLInputElement>document.getElementById("checkCondicionUso")).checked;
    if (!conditionUse) {
      window.alert("Debe aceptar los Terminos de Condiciones de Uso");
    }
    return conditionUse;
  }

  /**
   * Metodo para validar que el nombre y apellido sumnistrado en el formulario registrar usuario
   * no contengan caracteres numericos
   * @param user 
   */
  validateNameUserRegistre(user:User):boolean{
      if (this.validateNumberInName(user.name) && this.validateNumberInName(user.lastname)) {
        return true;
      }else if (!this.validateNumberInName(user.name)) {
        window.alert("El nombre no debe contener caracteres númericos");
      }else if (!this.validateNumberInName(user.lastname)){
        window.alert("El apellido no debe contener caracteres númericos");
      }
      return false;
  }

  validatePasswordsRegistre(passwordUser:string, passwordConf:string): boolean{
    if (passwordUser === passwordConf) {
      return true;
    }else{
      window.alert("Las contraseñas no coinciden");
      return false;
    }
  }

  /**
   * Metodo que valida que todos los campos del formulario Registro Usuario tenga la logitud adecuada
   * @param user 
   */
  validateLongCamposRegistro(user:User):boolean{

    if (this.validateTextLong(user.name) && this.validateTextLong(user.lastname) 
      && this.validateEmail(user.email) && this.validatePasswordLong(user.password)) {
        return true;
      }else{
        if (this.validateTextLong(user.name) == false) {
          window.alert("Longitud nombre debe ser minimo 5 caracteres");
        }else if (this.validateTextLong(user.lastname) == false) {
          window.alert("Longitud apellido debe ser minimo 5 caracteres");
        }else if (this.validateEmail(user.email) == false) {
          window.alert("Correo electronico invalido");
        }else if (this.validatePasswordLong(user.password) == false) {
          window.alert("Longitud de la Contraseña debe ser minimo 5 caracteres");
        }
      }
    return false;
  }

}
