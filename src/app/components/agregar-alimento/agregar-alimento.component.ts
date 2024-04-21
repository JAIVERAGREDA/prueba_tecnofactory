import { Component } from '@angular/core';
import { AlimentosService } from 'src/app/services/alimentosService';

@Component({
  selector: 'app-agregar-alimento',
  templateUrl: './agregar-alimento.component.html',
  styleUrls: ['./agregar-alimento.component.css']
})
export class AgregarAlimentoComponent {
  nuevoAlimento: any = {};

  constructor(private alimentosService: AlimentosService) {}
  
  agregarAlimento(): void {
    // Verificar si todos los campos requeridos están llenos
    if (!this.nuevoAlimento.nombre || !this.nuevoAlimento.descripcion || !this.nuevoAlimento.precio || !this.nuevoAlimento.cantidad) {
      // Mostrar un mensaje de error o realizar alguna acción adecuada
      console.error('Por favor, complete todos los campos.');
      return;
    }

    // Llamar al método del servicio para agregar el alimento
    this.alimentosService.agregarAlimento(this.nuevoAlimento)
      .subscribe(
        (respuesta: any) => {
          // Manejar la respuesta aquí si es necesario
          console.log('Alimento agregado correctamente:', respuesta);
          // Limpiar el formulario después de agregar el alimento
          this.nuevoAlimento = {};
        },
        (error: any) => {
          console.error('Error al agregar alimento:', error);
          // Manejar el error aquí si es necesario
        }
      );
  }
}
