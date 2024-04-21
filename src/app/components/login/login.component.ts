import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent  {
  username = '';
  password = '';
  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    if (this.authService.loginUser(this.username, this.password)) {
      // Si las credenciales son válidas para un usuario normal, lo redirigimos a la página principal
      this.router.navigate(['/']);
    } else if (this.authService.loginAdmin(this.username, this.password)) {
      // Si las credenciales son para el administrador, lo autenticamos como administrador
      this.router.navigate(['/listar-productos']);
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Nombre de usuario o contraseña incorrectos',
        icon: 'error',
        confirmButtonText: 'Cerrar'
      });
    }
  }
}
