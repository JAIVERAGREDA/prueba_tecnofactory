import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  logoutEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor(private router: Router) {}

  loginUser(username: string, password: string): boolean {
    if (username === 'jaiver' && password === '12345678') {
      const user = { username: username, token: 'token-de-autenticacion' };
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    } else {
      return false;
    }
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.logoutEvent.emit();
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  getCurrentUser(): any {
    const user = localStorage.getItem('currentUser');
    console.log(user);
    return user ? JSON.parse(user) : null;
  }

  loginAdmin(username: string, password: string): boolean {
    // Verificamos que las credenciales sean del administrador
    if (username === 'admin' && password === 'admin') {
      // Marcar al administrador como autenticado
      const user = { username: username, token: 'token-de-autenticacion' };
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }
    return false;
  }

  isLoggedInAsAdmin(): boolean {
    const user = this.getCurrentUser();
    return user && user.username === 'admin';
  }
}
