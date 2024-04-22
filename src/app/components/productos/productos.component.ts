import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/dataService';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})
export class ProductosComponent implements OnInit {
  data: any = [];
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.getProductos();
  }

  getProductos() {
    this.dataService.getDataProductos().subscribe(
      (response) => {
        this.data = response.data.productos;
      },
      (error) => {
        console.error('Error al obtener los datos:', error);
      }
    );
  }
  agregar(item: any): void {
    let carritoString = localStorage.getItem('carrito');
    let carrito: {
      imagen: string;
      id: string;
      nombre: string;
      cantidad: number;
      precio: number;
    }[] = carritoString ? JSON.parse(carritoString) : [];

    // Buscar si el producto ya está en el carrito
    const index = carrito.findIndex((producto) => producto.id === item.id);

    if (index !== -1) {
      // Si el producto ya está en el carrito, incrementar la cantidad
      carrito[index].cantidad++;
    } else {
      // Si el producto no está en el carrito, agregarlo con cantidad 1
      carrito.push({
        id: item.id,
        nombre: item.nombre,
        cantidad: 1,
        precio: item.precio,
        imagen: item.imagen,
      });
    }

    // Calcular el total
    let total = 0;
    for (const producto of carrito) {
      total += producto.precio * producto.cantidad;
    }

    // Guardar el carrito actualizado y el total en el localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
    localStorage.setItem('total', JSON.stringify(total));
  }
}
