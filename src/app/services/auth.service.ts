// auth.service.ts
 
import { Injectable } from '@angular/core';
 
@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  constructor() { }
 
  // Método para iniciar sesión
  login(username: string, password: string): boolean {
    console.log(username, "mi usarname");
    console.log(password, "mi password");
    
    if (username === 'jaiver' && password === '12345678') {
      localStorage.setItem('currentUser', JSON.stringify({ username, token: 'token-de-autenticacion' }));
      return true;
    } else {
      return false;
    }
  }
 
  // Método para cerrar sesión
  logout(): void {
    localStorage.removeItem('currentUser');
  }
 
  // Método para verificar si el usuario está autenticado
  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }
 
  // Método para obtener el usuario actual
  getCurrentUser(): any {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }
}