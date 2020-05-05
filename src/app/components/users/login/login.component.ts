import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public errors = { loginArgument: false, loginEmail: false, loginPassword: false };
  public loginEmail: string;
  public loginPassword: string;
  public rememberMe: boolean = false;
  public status = { loggingIn: false };

  constructor(private usersService: UsersService) { }

  /**
   * Permite autenticar el inicio de sesión de un usuario. Si los
   * datos ingresados corresponden a los del usuario, se procede a
   * cargar los datos del usuario.
   * Utiliza un manejo de errores (Véase manageLoginErrors(any)).
   */
  public login() {
    if (this.validateLogin()) {
      this.status.loggingIn = true;
      this.usersService.login(this.loginEmail, this.loginPassword).then(() => {
        if (this.rememberMe) {
          this.usersService.saveUserInStorage();
        }
        document.getElementById("loginModal").click();
      }).catch(error => {
        this.manageLoginErrors(error);
      }).finally(() => {
        this.status.loggingIn = false;
      });
    } else {
      console.log("Invalido")
    }
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

  validateLogin(): boolean {
    return true;
  }

}