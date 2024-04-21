import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  currentUser: any;
  mostrarModal = false;
  carrito: any[] = [];
  total: number = 0;
  cantidadCompra: number = 0;
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
  }
  resumenPedido() {
    // Obtener el carrito del localStorage
    const carritoString = localStorage.getItem('carrito');
    if (carritoString) {
      this.carrito = JSON.parse(carritoString);            
    }

    // Obtener el total del localStorage
    const totalString = localStorage.getItem('total');
    if (totalString) {
      this.total = JSON.parse(totalString);
    }
  }

  
}
