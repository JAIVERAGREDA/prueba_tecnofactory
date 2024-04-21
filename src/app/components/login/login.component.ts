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
  
    if (this.authService.login(this.username, this.password)) {
      this.router.navigate(['/']);
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Nombre de usuario o contraseña incorrectos',
        icon: 'error',
        confirmButtonText: 'Cerrar'
      })     
    }
  }
}
