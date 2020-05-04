import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/entities/User';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

  public errors = {
    signInFirstName: false, signInLastName: false, signInEmail: false,
    signInEmailAlreadyInUse: false, signInPassword: false,
    signInConfirmPassword: false, signInConditions: false
  };
  public formSignIn: FormGroup;
  public signInConfirmPassword: string;
  public status = {
    signing: false, signInPasswordShow: false, signInConfirmPasswordShow: false
  };

  constructor(private usersService: UsersService) {
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

  private managerRegisterErrors(error: any) {
    switch (error.code) {
      case "auth/email-already-in-use": this.errors.signInEmailAlreadyInUse = true; break;
      default: alert("Se ha producido un error desconocido. L2"); console.log(error); break;
    }
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
      var password: string = this.formSignIn.get("password").value;
      this.usersService.registerUser(user.email, password).then(result => {
        user.id = result.user.uid;
        this.usersService.addUser(user).then(() => {
          this.usersService.login(user.email, password).then(() => {
            document.getElementById("signInModal").click();
            this.status.signing = false;
          });
        }).catch(error => {
          this.status.signing = false;
          alert("Error al agregar al usuario.");
          console.log(error);
        });
      }).catch(error => {
        this.managerRegisterErrors(error);
        this.status.signing = false;
      });
    }
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
