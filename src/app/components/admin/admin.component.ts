import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  // Definición de variables de clase
  currentUser: any; // Representa al usuario actual
  isAdmin: boolean = false; // Indica si el usuario actual es un administrador

  // Constructor del componente
  constructor(private authService: AuthService, private router: Router) {}

  // Método ngOnInit, se ejecuta cuando el componente se inicia
  ngOnInit(): void {
    // Obtener el usuario actual
    this.currentUser = this.authService.getCurrentUser();
    // Verificar si el usuario está autenticado y es un administrador
    if (this.currentUser) {
      this.isAdmin = this.authService.isLoggedInAsAdmin();
    }
  }

  // Método para cerrar sesión
  cerrarSesion(): void {
    // Llama al servicio de autenticación para cerrar sesión
    this.authService.logout();
    // Redirige al usuario a la página principal después de cerrar sesión
    this.router.navigate(['/']);
  }
}
