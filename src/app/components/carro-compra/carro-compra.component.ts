import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carro-compra',
  templateUrl: './carro-compra.component.html',
  styleUrls: ['./carro-compra.component.css']
})
export class CarroCompraComponent implements OnInit {

  // Definición de variables de clase
  carrito: any[] = []; // Representa los elementos en el carrito de compra
  total: number = 0; // Representa el total de la compra
  cantidadCompra: number = 0; // Representa la cantidad total de productos en el carrito

  // Método ngOnInit, se ejecuta cuando el componente se inicia
  ngOnInit(): void {
    // Obtener el carrito de compra desde el almacenamiento local
    const carritoString = localStorage.getItem('carrito');
    if (carritoString) {
      this.carrito = JSON.parse(carritoString);      
    }

    // Obtener el total del carrito de compra desde el almacenamiento local
    const totalString = localStorage.getItem('total');
    if (totalString) {
      this.total = JSON.parse(totalString);
    }
  }
  
}
