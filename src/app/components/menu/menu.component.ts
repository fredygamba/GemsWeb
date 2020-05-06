import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/entities/User';
import { UsersService } from 'src/app/services/users/users.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Strings } from 'src/app/utilities/Strings';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { Category } from 'src/app/entities/Category';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public errors = {
    loginArgument: false, loginEmail: false, loginPassword: false,
    signInFirstName: false, signInLastName: false, signInEmail: false,
    signInEmailAlreadyInUse: false, signInPassword: false,
    signInConfirmPassword: false, signInConditions: false
  };
  public listCategories: Category[];
  public loginEmail: string;
  public loginPassword: string;
  public signInConfirmPassword: string;
  public signInPassword: string;
  public status = {
    loggingIn: false, signing: false,
    signInPasswordShow: false, signInConfirmPasswordShow: false
  };
  public user: User;
  public formSignIn: FormGroup;

  constructor(
    public usersService: UsersService, 
    private categoriesService: CategoriesService) {

    this.listCategories = [];
    this.user = { firstName: null, lastName: null, email: null };
    this.buildFormSingIn();
  }

  private buildFormSingIn() {
    this.formSignIn = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.minLength(3), this.validateWhiteSpace]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  private buildUser(): User {
    return {
      firstName: this.formSignIn.get("firstName").value,
      lastName: this.formSignIn.get("lastName").value,
      email: this.formSignIn.get("email").value
    };
  }

  getCategories(){
    this.categoriesService.getCategories().subscribe(result => {
      this.listCategories =result;
    });
  }

  /**
   * Permite autenticar el inicio de sesión de un usuario. Si los
   * datos ingresados corresponden a los del usuario, se procede a
   * cargar los datos del usuario.
   * Utiliza un manejo de errores (Véase manageLoginErrors(any)).
   */
  public login() {
    if (this.validateLogin()) {
      // this.status.loggingIn = true;
      // this.usersService.authenticateUser(this.loginEmail, this.loginPassword).then(result => {
      //   this.usersService.getUser(result.user.uid).subscribe(res => {
      //     console.log(res);
      //   });
      // }).catch(error => {
      //   this.manageLoginErrors(error);
      // }).finally(() => {
      //   this.status.loggingIn = false;
      // });
    } else {
      console.log("Invalido")
    }
  }

  get email(): AbstractControl {
    return this.formSignIn.get("email");
  }

  get firstName(): AbstractControl {
    return this.formSignIn.get("firstName");
  }

  get lastName(): AbstractControl {
    return this.formSignIn.get("lastName");
  }

  get password(): AbstractControl {
    return this.formSignIn.get("password");
  }

  /**
   * Metodo encargado para cerrar sesión
   */
  public logout() {
    this.usersService.logout();
    document.getElementById("confSignOff").click();
  }

  /**
   * Administrar los errores que se pueden producir al iniciar sesión.
   * Estos errores se utilizan para alternar un objeto "bandera" (@var errors),
   * que es utilizado por la vista para mostrar advertencias de los errores.
   * Los errores que se pueden encontrar son: 
   * "auth/argument-error" -> Los datos ingresados no son válidos.
   * "auth/user-not-found" -> El correo electrónico no se encontró.
   * "auth/wrong-password" -> La contraseña es invalida.
   * @param error Error que se produce al iniciar sesión.
   */
  private manageLoginErrors(error: any) {
    switch (error.code) {
      case "auth/argument-error": this.errors.loginArgument = true; console.log(error); break;
      case "auth/user-not-found": this.errors.loginEmail = true; break;
      case "auth/wrong-password": this.errors.loginPassword = true; break;
      default: alert("Se ha producido un error desconocido. L1"); console.log(error); break;
    }
  }

  private managerRegisterErrors(error: any) {
    switch (error.code) {
      case "auth/email-already-in-use": this.errors.signInEmailAlreadyInUse = true; break;
      default: alert("Se ha producido un error desconocido. L2"); console.log(error); break;
    }
  }

  ngOnInit(): void {
    this.getCategories();
  }

  /**
   * Este método permite registrar a usuarios a partir de los datos
   * obtenidos del formulario( @see signInModal ).Antes de registrar
   * al usuario, valida si los datos ingresados en el modal son
   * correctos (Véase @method validateRegister() ).
   */
  public register() {
    if (this.validateRegister()) {
      this.status.signing = true;
      var user: User = this.buildUser();
      this.usersService.registerUser(user.email, this.formSignIn.get("password").value).then(result => {
        user.id = result.user.uid;
        this.usersService.addUser(user).then(() => {
          document.getElementById("signInModal").click();
          this.status.signing = false;
        });
      }).catch(error => {
        this.status.signing = false;
        this.managerRegisterErrors(error);
      })
    }
  }

  validateLogin(): boolean {
    return true;
  }

  /**
   * Valida si se ha confirmado la contraseña que se ha ingresado
   * en el formulario ( @see signInModal ) y corresponde a la
   * contraseña que se solicita.
   * @returns boolean
   * true: Se ha confirmado la contraseña y es idéntica a la
   * contraseña solicitada.
   * false: No se ha conformado la contraseña o no es idéntica
   * a la contraseña solicitada.
   */
  validateConfirmPassword(): boolean {
    return this.signInConfirmPassword != undefined &&
      this.signInConfirmPassword == this.password.value && this.signInConfirmPassword.length >= 6;
  }

  validateRegister(): boolean {
    var firstName: AbstractControl = this.formSignIn.get('firstName');
    var lastName: AbstractControl = this.formSignIn.get('lastName');
    var email: AbstractControl = this.formSignIn.get('email');
    var password: AbstractControl = this.formSignIn.get('password');
    var confirmPassword: AbstractControl = this.formSignIn.get('confirmPassword');
    firstName.patchValue(firstName.value.replace(/\s+/g, ' ').trim());
    lastName.patchValue(lastName.value.replace(/\s+/g, ' ').trim());
    email.patchValue(email.value.replace(/\s+/g, ' ').trim());
    if (!firstName.valid) {
      this.errors.signInFirstName = true;
      this.firstName.markAsDirty();
    } else if (!lastName.valid) {
      this.errors.signInLastName = true;
      this.lastName.markAsDirty();
    } else if (!email.valid) {
      this.errors.signInEmail = true;
      this.email.markAsDirty();
    } else if (!password.valid) {
      this.errors.signInPassword = true;
      this.password.markAsDirty();
    } else if (!this.validateConfirmPassword()) {
      if (this.signInConfirmPassword == undefined) {
        this.signInConfirmPassword = "";
      }
      this.errors.signInConfirmPassword = true;
    } else if (!(<HTMLInputElement>document.getElementById("checkConditions")).checked) {
      this.errors.signInConditions = true;
    } else {
      return true;
    }
    return false;
  }

  private validateWhiteSpace(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

}