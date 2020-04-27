import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/entities/User';
import { element } from 'protractor';
import { UsersService } from 'src/app/services/users/users.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  public email: string = "";
  public password: string ="";
  public confPassword: string ="";
  public user: User;

  constructor(public userService: UsersService, private modalService: NgbModal) {
    this.user = { name: "", lastname: "", email: "", password: "" };
  }
  /**
   * Metodo encargado de iniciar sesion
   */
  login() {
    if (this.validateEmail(this.email) && this.validateTextLong(this.password)) {
      var remember: boolean = (<HTMLInputElement>document.getElementById("checkRecId")).checked;
      if (remember) {
        this.userService.saveStorageUser({id: "1", name: "Yeisson", lastname: "Lopez", email: this.email, password: this.password});
        document.getElementById("loginModal").click();
      }
    }
    (!this.validateEmail(this.email))?window.alert("Correo Electronico Incorrecto"):"";
    (!this.validateTextLong(this.password))?window.alert("Contraseña no valida"):"";
  }
  /**
   * Metodo encargado para cerrar sesión
   */
  exitLogin(){
    this.userService.logOut();
  }
  /**
   * Metodo encargado de registrar un nuevo usuario
   */
  register() {
    if (this.validateRegister(this.user)) {
      window.alert("Se ha registrado con exito el usuario: " + this.user.name + " " + this.user.lastname);
    }
  }

  /**
   * Metodo para validar si un email cuenta con arroba y .com /// string.includes(".com") && (string.includes("@"))
   * @param string 
   */
  validateEmail(string:string):boolean{
    if (this.validateTextLong(string)) {
      return(string.match("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"))?true:false;
    }
  }
  /**
   * Metodo para validar que la longitud de una cadena sea la adecuada para 
   * los campos de un formulario
   * @param string 
   */
  validateTextLong(string:string):boolean{
    string.trim();
    return (string.length > 4)?true:false;
  }
  /**
   * Metodo para validar si una cadena tiene numeros
   * @param string 
   */
  validateNumberInName(string:string):boolean{
    if (this.validateTextLong(string)) {
      return (!string.match("[0-9]+"))?true:false;
    }
  }
  /**
   * Metodo que valida todos los campos del registro del nuevo Usuario
   * @param user 
   */
  validateRegister(user: User): boolean {
    if (user != undefined && user != null) {
    return (this.validateLongCamposRegistro(user) && this.validateNameUserRegistre(user) && this.validateTermsOfUse() &&
    this.validatePasswordsRegistre(user.password,this.confPassword))?true:false;
    }
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
      (!this.validateNumberInName(user.name))?window.alert("El nombre no debe contener caracteres númericos"):"";
      (!this.validateNumberInName(user.lastname))?window.alert("El apellido no debe contener caracteres númericos"):"";
      return (this.validateNumberInName(user.name) && this.validateNumberInName(user.lastname))?true:false;
  }

  validatePasswordsRegistre(passwordUser:string, passwordConf:string): boolean{
    (passwordUser === passwordConf)?"":window.alert("Las contraseñas no coinciden");
    return (passwordUser === passwordConf)?true:false;
  }

  /**
   * Metodo que valida que todos los campos del formulario Registro Usuario tenga la logitud adecuada
   * @param user 
   */
  validateLongCamposRegistro(user:User):boolean{
    var aux:boolean=(this.validateTextLong(user.name) && this.validateTextLong(user.lastname)&& this.validateEmail(user.email) && this.validateTextLong(user.password));
    (!this.validateTextLong(user.name))?window.alert("Longitud nombre debe ser minimo 5 caracteres"):"";
    (!this.validateTextLong(user.lastname))?window.alert("Longitud apellido debe ser minimo 5 caracteres"):"";
    (!this.validateEmail(user.email))?window.alert("Correo electronico invalido"):"";
    (!this.validateTextLong(user.password))?window.alert("Longitud de la Contraseña debe ser minimo 5 caracteres"):"";
   
    return aux;
  }
  
}