import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carro-compra',
  templateUrl: './carro-compra.component.html',
  styleUrls: ['./carro-compra.component.css']
})
export class CarroCompraComponent implements OnInit {

  carrito: any[] = [];
  total: number = 0;
  cantidadCompra: number = 0;

  ngOnInit(): void {
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
