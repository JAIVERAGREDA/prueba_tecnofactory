import { Component, OnInit } from '@angular/core';
import { AlimentosService } from 'src/app/services/alimentosService';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.css'],
})
export class ListarProductosComponent implements OnInit {
  productos: any[] = [];
  paginaActual: number = 1;
  productosPorPagina: number = 10;

  constructor(
    private alimentosService: AlimentosService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos(): void {
    this.alimentosService.obtenerAlimentos().subscribe(
      (data: any) => {
        this.productos = data.data.productos;
      },
      (error: any) => {
        console.error('Error al obtener productos:', error);
      }
    );
  }

  //paginador
  cambiarPagina(nuevaPagina: number): void {
    this.paginaActual = nuevaPagina;
  }

  get totalPaginas(): number {
    return Math.ceil(this.productos.length / this.productosPorPagina);
  }

  get totalPaginasArray(): number[] {
    return Array.from({ length: this.totalPaginas }, (_, index) => index + 1);
  }

  get productosPaginados(): any[] {
    const indiceInicial = (this.paginaActual - 1) * this.productosPorPagina;
    const indiceFinal = indiceInicial + this.productosPorPagina;
    return this.productos.slice(indiceInicial, indiceFinal);
  }

  //Editar
  editarAlimento(alimentoEditado: any): void {
    Swal.fire({
      title: 'Editar Alimento',
      html: `
        <input id="nombre" class="swal2-input" value="${alimentoEditado.nombre}" placeholder="Nombre">
        <input id="descripcion" class="swal2-input" value="${alimentoEditado.descripcion}" placeholder="Descripción">
        <input id="precio" class="swal2-input" value="${alimentoEditado.precio}" placeholder="Precio">
        <input id="stock" class="swal2-input" value="${alimentoEditado.stock}" placeholder="Cantidad disponible">
      `,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        const nombre = (document.getElementById('nombre') as HTMLInputElement)
          .value;
        const descripcion = (
          document.getElementById('descripcion') as HTMLInputElement
        ).value;
        const precio = (document.getElementById('precio') as HTMLInputElement)
          .value;
        const stock = (document.getElementById('stock') as HTMLInputElement)
          .value;

        const regex = /^[0-9]*$/;
        if (!regex.test(precio) || !regex.test(stock)) {
          Swal.showValidationMessage('Precio y stock deben ser números');
          return false;
        }

        // Crea un objeto con los datos editados
        const alimentoEditadoNuevo = {
          id: alimentoEditado.id,
          nombre,
          descripcion,
          precio,
          stock,
        };

        // Realiza la solicitud PUT al servidor
        this.alimentosService
          .editarAlimentoMockyio(alimentoEditadoNuevo)
          .subscribe(
            (res) => {
              this.actualizarProducto(
                alimentoEditadoNuevo.id,
                alimentoEditadoNuevo
              );
            },
            (error) => {
              console.log(error);
            }
          );
        return true;
      },
    })
      .then((result: any) => {
        if (result.isConfirmed) {
          Swal.fire(
            '¡Actualizado!',
            'El alimento ha sido actualizado correctamente.',
            'success'
          );
        }
      })
      .catch((error: any) => {
        // Manejar el error si es necesario
        console.error('Error al editar el alimento:', error);
        Swal.fire(
          'Error',
          'Hubo un problema al actualizar el alimento.',
          'error'
        );
      });
  }

  actualizarProducto(id: number, nuevosDatos: any): void {
    const indice = this.productos.findIndex((producto) => producto.id === id);
    if (indice !== -1) {
      this.productos[indice] = { ...this.productos[indice], ...nuevosDatos };
    } else {
      console.log('No se encontró ningún producto con el ID proporcionado.');
    }
  }

  //Eliminar
  eliminarAlimento(id: string): void {
    // Mostrar un cuadro de diálogo de confirmación antes de eliminar el producto
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede revertir',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.alimentosService.eliminarAlimento(id).subscribe(
          (data: any) => {
            this.eliminarProducto(Number.parseInt(id));
            Swal.fire(
              '¡Eliminado!',
              'El producto ha sido eliminado.',
              'success'
            );
          },
          (error: any) => {
            console.error('Error al eliminar el producto:', error);
            Swal.fire(
              'Error',
              'Ha ocurrido un error al eliminar el producto.',
              'error'
            );
          }
        );
      }
    });
  }

  eliminarProducto(id: number): void {
    const indice = this.productos.findIndex((producto) => producto.id === id);
    this.productos.splice(indice, 1);
  }

  //Crear nuevo producto
  crearNuevoProducto(): void {
    Swal.fire({
      title: 'Crear Nuevo Producto',
      html: `
        <input id="nombre" class="swal2-input" placeholder="Nombre">
        <input id="descripcion" class="swal2-input" placeholder="Descripción">
        <input id="precio" class="swal2-input" placeholder="Precio">
        <input id="stock" class="swal2-input" placeholder="Cantidad disponible">
      `,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        const nombre = (document.getElementById('nombre') as HTMLInputElement)
          .value;
        const descripcion = (
          document.getElementById('descripcion') as HTMLInputElement
        ).value;
        const precio = (document.getElementById('precio') as HTMLInputElement)
          .value;
        const stock = (document.getElementById('stock') as HTMLInputElement)
          .value;
        const nuevoProducto = { nombre, descripcion, precio, stock };
        this.productos.unshift(nuevoProducto);

        const regex = /^[0-9]*$/;
        if (!regex.test(precio) || !regex.test(stock)) {
          Swal.showValidationMessage('Precio y stock deben ser números');
          return false;
        }
        return true;
      },
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const nuevoAlimento = result.value;
        Swal.fire('Creado!', 'El producto ha sido creado.', 'success');
        Swal.close();
      }
    });
  }
}
