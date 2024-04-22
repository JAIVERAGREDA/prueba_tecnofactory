import { Component } from '@angular/core';
import { AlimentosService } from 'src/app/services/alimentosService';

@Component({
  selector: 'app-agregar-alimento',
  templateUrl: './agregar-alimento.component.html',
  styleUrls: ['./agregar-alimento.component.css'],
})
export class AgregarAlimentoComponent {
  nuevoAlimento: any = {};

  constructor(private alimentosService: AlimentosService) {}

  agregarAlimento(): void {
    // Verifica si todos los campos requeridos están llenos
    if (
      !this.nuevoAlimento.nombre ||
      !this.nuevoAlimento.descripcion ||
      !this.nuevoAlimento.precio ||
      !this.nuevoAlimento.cantidad
    ) {
      console.error('Por favor, complete todos los campos.');
      return;
    }

    this.alimentosService.agregarAlimento(this.nuevoAlimento).subscribe(
      (respuesta: any) => {
        this.nuevoAlimento = {};
      },
      (error: any) => {
        console.error('Error al agregar alimento:', error);
      }
    );
  }
}
